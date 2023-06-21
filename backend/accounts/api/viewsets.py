from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken

from helpers.utils import deserialize
from helpers.viewsets import BaseViewSet, authenticated

from .serializers import AccountSerializer, AccountWriteSerializer
from ..models import Account, PasswordReset
from ..tasks import delay_send_password_reset_email


class AccountViewSet(BaseViewSet):
    """
    Endpoints:\n
        POST        -   /accounts/login/
        POST        -   /accounts/signup/
        GET, POST    -   /accounts/me/
        GET, POST    -   /accounts/reset-password/
    """

    serializer_class = AccountSerializer
    queryset = Account.objects.filter(is_active=True)

    @deserialize
    @action(methods=["post"], detail=False)
    def login(self, request, data={}):
        email = data.get("email", "").strip().lower()
        password = data.get("password", "").strip()

        account = Account.objects.filter(email=email).first()

        if account:
            if account.disabled:
                return self.respond(
                    data={"disabled": True}, status=status.HTTP_202_ACCEPTED
                )
            if account.check_password(password):
                return self.respond(obj=account)
        return self.respond(
            error="Username/email or password not recognized",
            status=status.HTTP_401_UNAUTHORIZED,
        )

    @authenticated
    @deserialize
    @action(methods=["post"], detail=False)
    def logout(self, request, data={}):
        token = RefreshToken(data["refresh"])
        token.blacklist()
        return self.respond(status=status.HTTP_200_OK)

    @deserialize
    @action(methods=["post"], detail=False)
    def signup(self, request, data={}, *args, **kwargs):
        account = None
        data_copy = data.copy()
        serializer = AccountWriteSerializer(
            data=data_copy, context={"request": request}
        )
        if serializer.is_valid():
            account = serializer.save()
            return self.respond(obj=account)

        return self.error_response_from_form(serializer)

    @deserialize
    @authenticated
    @action(methods=["get", "post"], detail=False)
    def me(self, request, data={}, *args, **kwargs):
        account = request.user
        if request.method == "GET":
            return self.respond(obj=account)
        elif request.method == "POST":
            serializer = AccountWriteSerializer(
                data=data, instance=account, context={"request": request}
            )
            if serializer.is_valid():
                account = serializer.save()
                return self.respond(obj=account)
            return self.error_response_from_form(serializer)

    @deserialize
    @action(methods=["get", "post"], url_path="reset-password", detail=False)
    def request_password_reset(self, request, data={}):
        if request.method == "GET":
            username = self.request.GET.get("username", "").strip().lower()
            account = Account.objects.filter(username=username).first()
            if account and account.disabled is False:
                reset_request = PasswordReset.initiate_password_reset(account)
                delay_send_password_reset_email.delay(reset_request.id)
        elif request.method == "POST":
            token = data.get("token", "").strip()
            new_password = data.get("new_password", "").strip()
            if new_password:
                reset_request = PasswordReset.objects.filter(
                    token=token, used=False
                ).first()
                if reset_request:
                    if reset_request.expires_at > timezone.now():
                        account = reset_request.account
                        account.set_password(new_password)
                        account.save()

                        reset_request.used = True
                        reset_request.save()
                        return self.respond(status=status.HTTP_200_OK, obj=account)
                    return self.respond(
                        error="Token is expired",
                        status=status.HTTP_412_PRECONDITION_FAILED,
                    )
                return self.respond(
                    error="Invalid token", status=status.HTTP_401_UNAUTHORIZED
                )
            return self.respond(
                error="New password must be supplied",
                status=status.HTTP_412_PRECONDITION_FAILED,
            )
        return self.respond(status=status.HTTP_200_OK)

    @deserialize
    @authenticated
    @action(methods=["post"], url_path="change-password", detail=False)
    def change_password(self, request, data={}, *args, **kwargs):
        account = request.user
        old_password = data.get("old_password", "").strip()
        new_password = data.get("new_password", "").strip()
        if new_password and account.check_password(old_password):
            if Account.objects.is_valid_password(new_password):
                account.set_password(new_password)
                account.save()
                return self.respond(status=status.HTTP_200_OK, obj=account)
            return self.respond(
                error=Account.objects.PASSWORD_VALIDATION_ERROR,
                status=status.HTTP_412_PRECONDITION_FAILED,
            )
        return self.respond(
            error="Old password was incorrect",
            status=status.HTTP_412_PRECONDITION_FAILED,
        )

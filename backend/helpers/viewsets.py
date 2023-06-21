from functools import wraps
from rest_framework import pagination, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from typing import Dict, Optional


def authenticated(fn):
    @wraps(fn)
    def wrap(self, request, *args, **kwargs):
        auth_resp = JWTAuthentication().authenticate(request)
        if auth_resp:
            [user, _] = auth_resp
            request.user = user
            return fn(self, request, *args, **kwargs)
        return self.respond(
            error="Unauthorized user", status=status.HTTP_401_UNAUTHORIZED
        )

    return wrap


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class ResultsAsDataPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):

        return Response(
            {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "count": self.page.paginator.count,
                "data": data,
            }
        )


class BaseViewSet(viewsets.GenericViewSet):
    authentication_classes = ()
    permission_classes = ()
    pagination_class = ResultsAsDataPagination

    def respond(
        self,
        dispatcher=None,
        raw=None,
        data: Optional[Dict[str, any]] = None,
        queryset=None,
        error: Optional[str] = None,
        status: Optional[int] = status.HTTP_200_OK,
        obj=None,
        form_error=None,
    ):
        DATA_KEY: str = "data"
        FORM_ERROR_KEY: str = "form_errors"
        ERROR_KEY: str = "error"
        response: Dict[str, any] = {}

        if dispatcher:
            # another class dispatched this method.  we need to take its args
            self.args = dispatcher.args
            self.kwargs = dispatcher.kwargs
            self.request = dispatcher.request
            self.format_kwarg = dispatcher.format_kwarg

        if raw:
            response = raw
        if data:
            response[DATA_KEY] = data
        if obj:  # Serialize the object
            response[DATA_KEY] = self.get_serializer().to_representation(obj)
        if queryset is not None:
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            else:
                serializer = self.get_serializer(queryset, many=True)
        if form_error:
            response[FORM_ERROR_KEY] = form_error.errors
            if not error:
                error = "Errors in your form.  Please fix"
        if error:  # Error message
            response[ERROR_KEY] = error
            if status == 200:
                raise Exception(
                    "You threw an error message to the client but your status code was 200 :("
                )

        return Response(response, status=status)

    def error_response_from_form(
        self, form, status_code=status.HTTP_412_PRECONDITION_FAILED
    ):
        errors = ", ".join(
            ["%s - %s" % (error, form.errors[error][0]) for error in form.errors]
        ).replace("__all__ - ", "")
        return self.respond(error=errors, status=status_code)  # error_meta=form.errors)


class BaseAuthViewSet(BaseViewSet):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

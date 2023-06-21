from rest_framework.serializers import SerializerMethodField, ValidationError, CharField, SerializerMethodField

from helpers.serializers import BaseSerializer
from helpers.viewsets import get_tokens_for_user
from ..models import Account


class AccountSerializer(BaseSerializer):
    token = SerializerMethodField()

    class Meta:
        model = Account
        fields = (
            "id",
            "token",
            "username",
            "email",
            "first_name",
            "last_name",
        )

    def get_token(self, obj: Account):
        auth_key = get_tokens_for_user(obj)
        return auth_key


class AccountWriteSerializer(BaseSerializer):
    token = SerializerMethodField()
    password = CharField(required=False, write_only=True)
    email = CharField(required=False)

    class Meta:
        model = Account
        fields = (
            "id",
            "token",
            "email",
            "first_name",
            "last_name",
            "password",
        )

    def validate_email(self, value):
        email = value
        if email:
            email = email.strip().lower()
        accounts = Account.objects.filter(email=email)
        if self.instance:
            accounts = accounts.exclude(id=self.instance.id)
        if accounts.exists():
            raise ValidationError(_("Email address has already been used."))
        return email

    def validate_password(self, value):
        password = value
        if Account.objects.is_valid_password(password):
            return password
        raise ValidationError(_(Account.objects.PASSWORD_VALIDATION_ERROR))

    def create(self, validated_data):
        account = Account.objects.create(**validated_data)
        password = self.validated_data.get("password")
        account.set_password(password)
        account.save()
        return account

    def update(self, instance, validated_data):
        password = self.validated_data.get("password")
        if instance.password != password and password:
            instance.set_password(password)
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.save()
        return instance

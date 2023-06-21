import logging
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField


from helpers.sendgrid import send_email
from helpers.utils import week_expiration_period, generate_url_token
from .managers import AccountManager

logger = logging.getLogger("challenge")


class Account(AbstractBaseUser, PermissionsMixin):
    objects = AccountManager()

    class Meta:
        ordering = ("-id",)

    USERNAME_FIELD = settings.ACCOUNT_NATURAL_KEY
    MINIUM_USERNAME_LENGTH = 3

    REQUIRED_FIELDS = ['username']

    username: str = models.CharField("username", max_length=32, unique=True, default=None, null=True, blank=True)
    email = models.EmailField(
        "email address", unique=True, default=None, null=False, blank=False
    )
    password = models.CharField(
        _("password"), max_length=128, default=None, null=True, blank=True
    )
    first_name: str = models.CharField(
        "First Name", max_length=32, default=None, null=True, blank=True
    )
    last_name: str = models.CharField(
        "Last Name", max_length=32, default=None, null=True, blank=True
    )

    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        "active",
        default=True,
        help_text=_(
            "Designates whether this user should be treated as "
            "active. Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    app_data = JSONField(default=None, null=True, blank=True)

    # Stripe
    stripe_id = models.CharField(max_length=256, default=None, null=True, blank=True)

    # Authy
    authy_id = models.CharField(
        "authy_id", max_length=32, default=None, null=True, blank=True
    )
    phone = PhoneNumberField(default=None, null=True)
    failed_tfa_attempts = models.SmallIntegerField(
        "failed_tfa_count", default=0, blank=True
    )
    disabled = models.BooleanField(default=False, blank=True)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"

    def get_full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    @property
    def phone_last_two(self):
        if self.phone:
            return str(self.phone.national_number)[-2:]
        return ""

    @property
    def phone_international(self):
        if self.phone:
            return self.phone.as_international
        return ""

    def send_account_locked_email(self):

        send_email(
            "Action Required: Account Locked",
            settings.DEFAULT_FROM_EMAIL,
            from_email=settings.SUPPORT_FROM_EMAIL,
            substitutions={
                "account_full_name": self.get_full_name(),
                "date": timezone.now().strftime("%m/%d/%Y"),
                "time": timezone.now().strftime("%H:%M:%S"),
                "timezone": timezone.get_current_timezone_name(),
                "phone": self.phone_international,
                "email": self.email,
            },
            template_id="",
        )

    def increment_tfa_attempts(self):
        self.failed_tfa_attempts += 1
        if self.failed_tfa_attempts >= 3:
            self.disabled = True
        self.save()

    def reset_tfa_attempts(self):
        self.failed_tfa_attempts = 0
        self.save()


class PasswordReset(models.Model):
    account = models.ForeignKey("accounts.Account", on_delete=models.CASCADE)
    token = models.CharField(max_length=256)
    expires_at = models.DateTimeField(default=week_expiration_period)
    used = models.BooleanField(default=False)

    @classmethod
    def initiate_password_reset(cls, account):
        reset_request = PasswordReset.objects.filter(
            account=account, used=False
        ).first()
        if reset_request:
            reset_request.token = generate_url_token()
            reset_request.expires_at = week_expiration_period()
            reset_request.save()
        else:
            reset_request = PasswordReset.objects.create(
                account=account, token=generate_url_token()
            )
        return reset_request

    def send_password_reset_email(self):
        reset_link: str = f"{settings.SITE_URL}?token={self.token}&expires_at={self.expires_at.timestamp()}"
        send_email(
            "Reset Your Password",
            self.account.email,
            substitutions={
                "recipient": self.account.get_full_name(),
                "reset": reset_link,
            },
            template_id="",
        )

from django.urls import reverse
from django.utils import timezone

from datetime import timedelta
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from helpers.test import DefaultSetup
from .models import PasswordReset


class AccountTest(DefaultSetup):
    def setUp(self):
        super(AccountTest, self).setUp()

    def login(self, email, password, client=None):
        if client:
            return client.post(
                reverse("account-login"), {"email": email, "password": password}
            )
        return self.client.post(
            reverse("account-login"), {"email": email, "password": password}
        )

    def test_logout(self):
        logging_out_account = self.create_user(
            username="logged_out", email="logged_out@test.com", password="P@ssw0rd!"
        )
        logging_out_refresh = str(RefreshToken.for_user(logging_out_account))
        logging_out_client = APIClient(
            HTTP_AUTHORIZATION=f"Bearer {str(AccessToken.for_user(logging_out_account))}"
        )

        response = logging_out_client.post(
            reverse("account-logout"), {"refresh": logging_out_refresh}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = logging_out_client.post(
            reverse("token_refresh"), {"refresh": logging_out_refresh}
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_with_email(self):
        account = self.create_user(email="logintest@email.com", password="t35T*test")
        client = self.create_client(account)

        response = self.login(account.email, account.clear_password, client=client)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.data.get("data", False)
        self.assertNotEqual(data, False)
        self.assertEqual(data.get("id", False), str(account.id), data)
        self.assertEqual(data.get("email", False), account.email, data)

    def test_login_fails_for_incorrect_password(self):
        account = self.create_user(username="incorrectpassword")

        response = self.login(account.email, "wrong")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_fails_for_incorrect_username(self):
        account = self.create_user(username="incorrectusername", password="t35T*test")

        response = self.login(
            "daniel+wrong_password@clearsumm.it", account.clear_password
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_me(self):
        response = self.client.get(reverse("account-me"))
        self.assertEqual(response.data.get("data").get("id"), str(self.account.id))

    def test_update_me(self):
        request_data = {"username": "shanez", "email": "shane@clearsumm.it"}

        response = self.client.post(reverse("account-me"), request_data)

        def check_field(name):
            self.assertEqual(
                response.data.get("data").get(name), request_data.get(name)
            )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for field in request_data:
            check_field(field)

    def test_request_password_reset(self):
        account = self.create_user()
        response = self.client.get(
            f'{reverse("account-request-password-reset")}?username={account.username}'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_request_password_reset_wrong_username(self):
        account = self.create_user()
        response = self.client.get(
            f'{reverse("account-request-password-reset")}?username={account.username+"wrong"}'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reset_password(self):
        account = self.create_user()
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {str(AccessToken.for_user(account))}"
        )
        old_password = "testtest"
        new_password = "supersecure"

        response = client.get(
            f'{reverse("account-request-password-reset")}?username={account.username}'
        )
        reset_request = PasswordReset.objects.filter(
            account=account, used=False
        ).first()

        response = client.post(
            reverse("account-request-password-reset"),
            {
                "token": reset_request.token,
                "new_password": new_password,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.login(account.email, old_password)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.login(account.email, new_password)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reset_password_expired_token(self):
        account = self.create_user()
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {str(AccessToken.for_user(account))}"
        )
        new_password = "supersecure"

        response = client.get(
            f'{reverse("account-request-password-reset")}?username={account.username}'
        )
        reset_request = PasswordReset.objects.filter(
            account=account, used=False
        ).first()

        reset_request.expires_at = timezone.now() - timedelta(weeks=1)
        reset_request.save()

        response = client.post(
            reverse("account-request-password-reset"),
            {
                "token": reset_request.token,
                "new_password": new_password,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_412_PRECONDITION_FAILED)

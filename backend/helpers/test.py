import os
import random
from django.apps import apps
from django.conf import settings
from rest_framework import test
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken
import simplejson as json

from accounts.models import Account


used_phone_numbers = []


def generate_random_phone_number():
    def get_random_phone():
        phone = "800"
        while len(phone) < 10:
            phone += str(random.randint(2, 9))
        return "+1" + phone

    random_number = get_random_phone()
    while random_number in used_phone_numbers:
        random_number = get_random_phone()
    used_phone_numbers.append(random_number)
    return random_number


class APITestCase(test.APITestCase):
    def setUp(self):
        super(APITestCase, self).setUp()

    def assertTotalCountEquals(self, response, count):
        try:
            self.assertEqual(response.data.get("meta", {}).get("count"), count)
        except AttributeError:
            raise Exception("Return type was unexpected:\n\n%s" % response.data)


class BaseTestSetup(APITestCase):
    def setUp(self):
        super(BaseTestSetup, self).setUp()
        self.set_account_and_client()

    def set_account_and_client(self):
        if not hasattr(self, "account"):
            self.account = self.create_user(
                username="challenge",
                email="challenge@challenge.com",
                password="P@ssw0rd!",
            )
            self.client = test.APIClient()
            self.client.credentials(
                HTTP_AUTHORIZATION=f"Bearer {str(AccessToken.for_user(self.account))}"
            )

    def create_user(
        self,
        username="clearsummit",
        email="test@clearsumm.it",
        password="testtest",
        phone="",
        authy_id="test_id",
        **kwargs,
    ):

        account = Account.objects.create(
            username=username,
            email=email,
            password=password,
            phone=(phone or generate_random_phone_number()),
            authy_id=authy_id,
            **kwargs,
        )

        setattr(account, "clear_password", password)
        account.set_password(password)
        account.save()
        return account

    def create_client(self, account=None):
        client = APIClient()
        if account:
            client.credentials(
                HTTP_AUTHORIZATION=f"Bearer {str(AccessToken.for_user(self.account))}"
            )
        return client


class UnrecognizedDeviceSetup(BaseTestSetup):
    def setUp(self):
        super(UnrecognizedDeviceSetup, self).setUp()
        self.set_account_and_client()

    def create_client_with_device(self, account):
        from devices.models import RecognizedDevice

        device = RecognizedDevice.generate_recognized_device(account)
        device.active = True
        device.save()

        client = test.APIClient(HTTP_DEVICETOKEN=device.token)
        client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {str(AccessToken.for_user(self.account))}"
        )
        return client


class RecognizedDeviceSetup(UnrecognizedDeviceSetup):
    def setUp(self):
        super(RecognizedDeviceSetup, self).setUp()
        self.set_account_and_client()

        from devices.models import RecognizedDevice

        self.device = RecognizedDevice.generate_recognized_device(self.account)
        self.device.active = True
        self.device.save()
        self.client = test.APIClient(HTTP_DEVICETOKEN=self.device.token)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {str(AccessToken.for_user(self.account))}"
        )


DefaultSetup = BaseTestSetup

if apps.is_installed("devices"):
    DefaultSetup = RecognizedDeviceSetup


class WriteMockHelper(DefaultSetup):
    def __init__(self, account=None, client=None):
        if account:
            self.account = account
        if client:
            self.client = client

    def create_mocks_from_response(self, response, method, url_path):
        if hasattr(response, "data"):
            url_path = url_path.replace("/", "-")
            response_path = os.path.join(
                settings.BASE_DIR,
                f'../api_mocks/{method.lower()}{url_path}{"response"}-{response.status_code}.json',
            )
            with open(response_path, "w") as f:
                f.write(
                    json.dumps(
                        response.data, use_decimal=True, sort_keys=True, indent=4
                    )
                )

        return response

    def call_write_methods_on_mocks_class(self):
        write_method_names = list(filter(lambda x: x.startswith("write_"), dir(self)))
        for method in write_method_names:
            getattr(self, method)()

from django.urls import reverse

from helpers.test import WriteMockHelper


class AccountMocks(WriteMockHelper):
    def login(self, username, password, client=None):
        if client:
            return client.post(
                reverse("account-login"), {"username": username, "password": password}
            )
        return self.client.post(
            reverse("account-login"), {"username": username, "password": password}
        )

    def write_login_mocks(self):
        request_url = reverse("account-login")
        response = self.login(
            self.account.username, self.account.clear_password, client=self.client
        )
        self.create_mocks_from_response(response, "POST", request_url)

    def write_login_fail_mocks(self):
        request_url = reverse("account-login")
        response = self.login(self.account.email, "wrong")
        self.create_mocks_from_response(response, "POST", request_url)

    def write_get_me_mocks(self):
        request_url = reverse("account-me")
        response = self.client.get(request_url)
        self.create_mocks_from_response(response, "GET", request_url)

    def write_update_me_mocks(self):
        request_url = reverse("account-me")
        request_data = {
            "email": "newemail@test.com",
        }
        response = self.client.post(request_url, request_data)
        self.create_mocks_from_response(response, "POST", request_url)

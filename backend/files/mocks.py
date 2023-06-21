from django.urls import reverse
from unittest.mock import patch

from helpers.test import WriteMockHelper
from helpers.test_mocks import MockBoto3Factory


class FileMocks(WriteMockHelper):
    @patch("files.models.boto3", new=MockBoto3Factory(True))
    def write_create_file_mocks(self):
        request_url = reverse("uploadfile-list")
        response = self.client.post(request_url, {"name": "test.jpg", "type": "jpg"})
        file_id = response.data["data"]["id"]
        self.create_mocks_from_response(response, "POST", request_url)

        def write_destroy_file_mocks():
            request_url = reverse("uploadfile-detail", kwargs={"pk": file_id})
            response = self.client.delete(request_url, {})
            self.create_mocks_from_response(response, "DELETE", request_url)

        # These tests must be run following the create file test
        write_destroy_file_mocks()

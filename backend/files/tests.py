from unittest.mock import patch
from django.urls import reverse
from rest_framework import status
from helpers.test import DefaultSetup
from helpers.test_mocks import MockBoto3Factory


class FilesTest(DefaultSetup):
    def setUp(self):
        super(FilesTest, self).setUp()

    @patch("files.models.boto3", new=MockBoto3Factory(True))
    def test_create_file(self):
        response = self.client.post(
            reverse("uploadfile-list"), {"name": "test.jpg", "type": "jpg"}
        )
        self.file_id = response.data["data"]["id"]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, "url")
        self.assertContains(response, "key")
        self.assertContains(response, "AWSAccessKeyId")
        self.assertContains(response, "put_key")
        self.assertContains(response, "signature")
        self.destroy_file()

    def destroy_file(self):
        response = self.client.delete(
            reverse("uploadfile-detail", kwargs={"pk": self.file_id}), {}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

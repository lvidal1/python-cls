from django.urls import reverse
from rest_framework import status

from helpers.test import DefaultSetup
from .models import Notification


class NotificationTest(DefaultSetup):
    def setUp(self):
        super(NotificationTest, self).setUp()

    def create_notification(self, account=None, **kwargs):
        user = account or self.account
        return Notification.objects.create(account=user, **kwargs)

    def test_list_notifications(self):
        test_notification = self.create_notification()
        list_response = self.client.get(reverse("notification-list"))
        data = list_response.data.get("data", False)

        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        self.assertIn(str(test_notification.id), list(map(lambda x: x["id"], data)))

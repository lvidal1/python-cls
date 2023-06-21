from rest_framework import status
from rest_framework.test import APITestCase, APIClient


class ViewTest(APITestCase):
    def setUp(self):

        self.client = APIClient()

    def test_access_react(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, '<div id="app"></div>')

    def test_access_react_subroute(self):
        response = self.client.get("/anything/but/api-and-admin")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, '<div id="app"></div>')

    def test_post_react(self):
        response = self.client.get("/anything-but-api-and-admin", format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, '<div id="app"></div>')

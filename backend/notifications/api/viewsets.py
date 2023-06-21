from helpers.viewsets import BaseAuthViewSet

from ..models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(BaseAuthViewSet):
    """
    Endpoints:\n
        GET            -   /notifications/
    """

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def list(self, request):
        return self.respond(queryset=self.get_queryset())

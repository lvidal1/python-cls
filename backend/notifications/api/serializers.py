from rest_framework.serializers import SerializerMethodField

from helpers import serializers
from ..models import Notification


class NotificationSerializer(serializers.BaseSerializer):
    class Meta:
        model = Notification
        fields = (
            "id",
            "created_at",
            "seen",
        )

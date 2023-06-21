from os import path
from helpers import serializers

from rest_framework.serializers import SerializerMethodField

from accounts.api.serializers import AccountSerializer
from ..models import UploadFile


class UploadFileBasicSerializer(serializers.BaseSerializer):
    url = SerializerMethodField()
    name = SerializerMethodField()
    ext = SerializerMethodField()
    created_by = AccountSerializer()

    class Meta:
        model = UploadFile
        fields = ("id", "url", "ext", "name", "created_at", "created_by")

    def get_name(self, obj):
        if obj.name:
            return obj.name
        if obj.aws_file.name:
            name = "==".join(obj.aws_file.name.split("==")[1:])
            if not name:
                return obj.aws_file.name

    def get_url(self, obj):
        return obj.get_presigned_url()

    def get_ext(self, obj):
        if obj.aws_file:
            root, ext = path.splitext(obj.aws_file.url)
            return ext
        return ""


class UploadFileSerializer(UploadFileBasicSerializer):
    class Meta:
        model = UploadFile
        fields = UploadFileBasicSerializer.Meta.fields + ("put_key",)

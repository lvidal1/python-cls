import abc
import boto3
import codecs
from datetime import datetime
from django.core.files.uploadedfile import TemporaryUploadedFile
from django.db import models
from django.conf import settings

from helpers.models import CreateAndUpdateMixin, user_based_path


class PresignedUrl(models.Model):
    __metaclass__ = abc.ABCMeta

    class Meta:
        abstract = True

    def get_presigned_url(self):
        if not settings.TESTING:
            s3 = boto3.client(
                "s3",
                config=boto3.session.Config(signature_version="s3v4"),
                region_name="us-east-2",
            )
            return s3.generate_presigned_url(
                ClientMethod="get_object",
                Params={
                    "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
                    "Key": self.aws_file.name,
                },
                ExpiresIn=3600,
            )  # Expires in one hour

    def upload_to_aws(self, created_by, aws_file):
        cleaned_name = self.get_cleaned_name(created_by, aws_file.name)
        if isinstance(aws_file, TemporaryUploadedFile):
            with codecs.open(
                aws_file.temporary_file_path(), encoding="ISO8859-1", mode="rb"
            ) as fr, open(cleaned_name, "w") as fw:
                fw.write(fr.read())

        else:
            with open(cleaned_name, "wb") as f:
                f.write(aws_file.file.getvalue())

        self.aws_file = cleaned_name
        self.name = aws_file.name

        s3 = boto3.client("s3")
        s3.upload_file(cleaned_name, settings.AWS_STORAGE_BUCKET_NAME, cleaned_name)
        self.save()
        return self

    @classmethod
    def get_put_key(cls, cleaned_name):
        s3 = boto3.client("s3", region_name="us-east-2")
        post = s3.generate_presigned_post(
            Bucket=settings.AWS_STORAGE_BUCKET_NAME,
            Key=cleaned_name,
            ExpiresIn=3600,
        )
        return post

    @classmethod
    def create(cls, cleaned_name, **kwargs):
        put_key = PresignedUrl.get_put_key(cleaned_name)
        created = cls.objects.create(
            put_key=put_key,
            aws_file=cleaned_name,
            **kwargs,
        )
        return put_key, created.pk

    @abc.abstractmethod
    def get_cleaned_name(cls, *args, **kwargs):
        raise NotImplementedError


class UploadFile(CreateAndUpdateMixin, PresignedUrl):
    put_key = models.TextField(default=None, null=True)
    aws_file = models.FileField(
        default=None, null=True, max_length=180, upload_to=user_based_path
    )
    name = models.CharField(max_length=120, default=None, null=True)
    soft_deleted = models.BooleanField(default=False)

    @classmethod
    def get_cleaned_name(cls, created_by, object_name, object_type):
        time_string = datetime.now().strftime("%s")
        return f"{created_by.id}-{time_string}-{object_name}".replace(" ", "_")

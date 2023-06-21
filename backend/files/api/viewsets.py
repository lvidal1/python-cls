from rest_framework import status
from helpers.viewsets import BaseAuthViewSet

from ..models import UploadFile
from .serializers import UploadFileSerializer


class UploadFileViewSet(BaseAuthViewSet):
    """
    Endpoints:\n
        POST, DELETE   -   /files/
    """

    queryset = UploadFile.objects.all()
    serializer_class = UploadFileSerializer

    def create(self, request):
        object_name = request.data.get("name", False)
        object_type = request.data.get("type", False)
        if object_name:
            if object_type:
                cleaned_name = UploadFile.get_cleaned_name(
                    request.user, object_name, object_type
                )
                put_key, pk = UploadFile.create(
                    cleaned_name, created_by=request.user, name=object_name
                )
                return self.respond(data={"id": pk, "put_key": put_key})
            return self.respond(
                error="type required (mime type)", status=status.HTTP_400_BAD_REQUEST
            )
        return self.respond(
            error="name required (file name without mime type)",
            status=status.HTTP_400_BAD_REQUEST,
        )

    def destroy(self, request, pk=None, *args, **kwargs):
        file = UploadFile.objects.filter(pk=pk).first()

        if file:
            if request.user == file.created_by:
                file.soft_deleted = True
                file.save()
                return self.respond(status=status.HTTP_200_OK)
        return self.respond(status=status.HTTP_401_UNAUTHORIZED)

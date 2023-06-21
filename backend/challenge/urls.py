"""challenge URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.apps import apps
from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from rest_framework import permissions
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from accounts.api.viewsets import AccountViewSet
from files.api.viewsets import UploadFileViewSet
from notifications.api.viewsets import NotificationViewSet

router = routers.DefaultRouter()

router.register(r"accounts", AccountViewSet)
router.register(r"files", UploadFileViewSet)
router.register(r"notifications", NotificationViewSet)

if apps.is_installed("devices"):
    from devices.api.viewsets import DeviceViewSet

    router.register(r"devices", DeviceViewSet, "device")

if apps.is_installed("invites"):
    from invites.api.viewsets import InviteViewSet

    router.register(r"invites", InviteViewSet, "invite")

if apps.is_installed("wallet"):
    from wallet.api.viewsets import CustomerViewSet, SourceViewSet

    router.register(r"customers", CustomerViewSet, "customer")
    router.register(r"sources", SourceViewSet, "source")

urlpatterns = [
    # API
    url(r"^api/v1/", include(router.urls)),
    path("admin/", admin.site.urls),
    path("api/v1/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(r"", include("react.urls", namespace="react")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

schema_view = get_schema_view(
    openapi.Info(
        title="codetest API",
        default_version="v1",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


if not settings.PRODUCTION and not settings.TESTING:
    urlpatterns.insert(
        2,
        url(
            r"^swagger(?P<format>\.json|\.yaml)$",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        ),
    )
    urlpatterns.insert(
        3,
        url(
            r"^swagger/$",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
    )
    urlpatterns.insert(
        4,
        url(
            r"^redoc/$",
            schema_view.with_ui("redoc", cache_timeout=0),
            name="schema-redoc",
        ),
    )

from django.urls import re_path

from . import views

app_name = "react"
urlpatterns = [
    re_path(".*", views.app, name="index"),
]

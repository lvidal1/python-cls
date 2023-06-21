import secrets
from datetime import timedelta
from django.utils import timezone
from functools import wraps


def deserialize(fn):
    @wraps(fn)
    def wrap(self, request, *args, **kwargs):
        if request.body:
            kwargs["data"] = self.request.data
        return fn(self, request, *args, **kwargs)

    return wrap


def week_expiration_period():
    return timezone.now() + timedelta(weeks=1)


def month_expiration_period():
    return timezone.now() + timedelta(weeks=4)


def generate_url_token():
    return secrets.token_urlsafe(128)


def add_to_class(cls):
    def deco(fn):
        if isinstance(fn, property):
            setattr(cls, fn.fget.__name__, fn)
        else:
            setattr(cls, fn.__name__, fn)
        return fn

    return deco

from django.shortcuts import render
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def app(request):
    return render(
        request,
        "index.html",
        context={
            "DEBUG": settings.DEBUG,
            "PRODUCTION": settings.PRODUCTION,
            "STAGING": settings.STAGING,
            "STATIC_URL": settings.STATIC_URL,
            "JS_BUNDLE": "build/build%s.min.js" % (settings.GIT_SHA_EXT,),
            "CSS_BUNDLE": "styles%s.css" % (settings.GIT_SHA_EXT,),
        },
    )

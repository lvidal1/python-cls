import celery
from django.core import management
from .models import PasswordReset


@celery.task(ignore_result=True, default_retry_delay=120, max_retried=60)
def delay_send_password_reset_email(instance_id):
    reset_request = PasswordReset.objects.get(pk=instance_id)
    reset_request.send_password_reset_email()


@celery.task(ignore_result=True, default_retry_delay=120, max_retried=60)
def flush_expired_tokens():
    management.call_command("flushexpiredtokens", verbosity=0)

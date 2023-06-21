import re
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

sg = SendGridAPIClient(settings.SENDGRID_API_KEY)


def is_email_whitelisted(email_address):
    return any(
        [
            re.search(whitelisted, email_address)
            for whitelisted in settings.POSTSAFE_WHITELISTED_EMAILS
        ]
    )


def filter_using_whitelist(to_emails):
    if settings.POSTSAFE_WHITELIST_ON and not settings.POSTSAFE_TEST_MODE:
        if isinstance(to_emails, list):
            for email_address in to_emails:
                if not is_email_whitelisted(email_address):
                    to_emails.remove(email_address)
        elif not is_email_whitelisted(to_emails):
            to_emails = []
    return to_emails


def send_email(
    subject,
    to_emails,
    from_email=settings.DEFAULT_FROM_EMAIL,
    substitutions={},
    template_id=None,
):
    message = Mail(subject=subject, to_emails=filter_using_whitelist(to_emails))
    message.from_email = from_email
    message.template_id = template_id
    message.dynamic_template_data = substitutions

    if not settings.TESTING and to_emails:
        sg.send(message)

from django.conf import settings
from django.shortcuts import render


def app(request):
    if (request.user.is_authenticated()):
        data = {}

        if settings.DEBUG and settings.DEBUG_WEBHOOK_IP:
            data['debug_webhook_ip'] = settings.DEBUG_WEBHOOK_IP

        return render(request, 'app.html', data)
    else:
        return render(request, 'homepage.html')

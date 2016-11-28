from django.conf import settings
from django.shortcuts import render
from leather.accounts.models import Account, PlaidAccount


def homepage(request):
    if (request.user.is_authenticated()):

        plaid_accounts = PlaidAccount.objects.filter(user=request.user)

        data = {
            "plaid_accounts": plaid_accounts
        }

        if settings.DEBUG and settings.DEBUG_WEBHOOK_IP:
            data['debug_webhook_ip'] = settings.DEBUG_WEBHOOK_IP

        return render(request, 'dashboard.html', data)
    else:
        return render(request, 'homepage.html')

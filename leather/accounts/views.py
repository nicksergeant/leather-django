from annoying.functions import get_object_or_None
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from leather.accounts.models import Account, PlaidAccount
from leather.accounts.models import Transaction
from leather.forecasting.models import ScheduledTransaction
from leather.ingest.actions import update_plaid_account
from plaid import Client

import json

if settings.DEBUG:
    Client.config({'url': 'https://tartan.plaid.com'})
else:
    Client.config({'url': 'https://api.plaid.com'})


@login_required
def account_detail(request, account_id):
    account = Account.objects.get(id=account_id,
                                  plaid_account__user=request.user)
    scheduled_transactions = ScheduledTransaction.objects.filter(
        account=account,
        match=None
    )
    return render(request, 'account-detail.html', {
        "account": account,
        "scheduled_transactions": scheduled_transactions,
    })


@login_required
def all_transactions(request):
    return render(request, 'all-transactions.html')


@login_required
def plaid_account_link(request):

    if request.method == 'POST':

        public_token = request.POST.get('public_token')

        client = Client(client_id=settings.PLAID_CLIENT_ID,
                        secret=settings.PLAID_SECRET)

        response = client.exchange_token(public_token)
        response = json.loads(response.content.decode('utf-8'))

        access_token = response['access_token']

        plaid_account = get_object_or_None(PlaidAccount,
                                           access_token=access_token)

        if not plaid_account:
            plaid_account = PlaidAccount(access_token=access_token,
                                         public_token=public_token,
                                         user=request.user,
                                         raw=response)
            plaid_account.save()
        else:
            plaid_account.public_token = public_token
            plaid_account.user = request.user
            plaid_account.raw = response
            plaid_account.save()

        from_date = (datetime.now() - timedelta(days=15)) \
            .strftime('%Y-%m-%d')

        update_plaid_account(access_token, from_date)

        return HttpResponseRedirect('/')

    return HttpResponse('')


@login_required
def plaid_account_delete(request, plaid_account_id):

    if request.method == 'POST':

        plaid_account = PlaidAccount.objects.get(id=plaid_account_id,
                                                 user=request.user)

        client = Client(client_id=settings.PLAID_CLIENT_ID,
                        secret=settings.PLAID_SECRET,
                        access_token=plaid_account.access_token)

        response = client.connect_delete()

        if response.status_code == 200:

            accounts = Account.objects.filter(plaid_account=plaid_account)

            for account in accounts:
                transactions = Transaction.objects.filter(account=account)

                for transaction in transactions:
                    transaction.delete()

                account.delete()

            plaid_account.delete()

        return HttpResponseRedirect('/')

    return HttpResponse('')


@login_required
def transaction_delete(request, transaction_id):
    transaction = get_object_or_404(Transaction,
                                    id=transaction_id,
                                    account__plaid_account__user=request.user)

    account = get_object_or_404(Account,
                                id=transaction.account.id)
    transaction.delete()

    return HttpResponseRedirect(account.get_absolute_url())

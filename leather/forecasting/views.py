import datetime

from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from leather.accounts.models import Account
from leather.forecasting.models import ScheduledTransaction


@login_required
def scheduled_transaction_add(request):
    if request.method == 'POST':
        account_id = request.POST.get('account')
        amount = request.POST.get('amount')
        name = request.POST.get('name')
        typ = request.POST.get('typ')

        account = get_object_or_404(Account,
                                    id=account_id,
                                    plaid_account__user=request.user)

        date = datetime.date.today() + datetime.timedelta(days=3)

        scheduled_transaction = \
            ScheduledTransaction(account=account,
                                 amount=amount,
                                 date=date,
                                 name=name,
                                 typ=typ)

        scheduled_transaction.save()

        return HttpResponseRedirect(account.get_absolute_url())
    else:
        return HttpResponseRedirect('/')


@login_required
def scheduled_transaction_delete(request, scheduled_transaction_id):

    scheduled_transaction = get_object_or_404(ScheduledTransaction,
                                              id=scheduled_transaction_id,
                                              account__plaid_account__user=request.user)

    account = get_object_or_404(Account,
                                id=scheduled_transaction.account.id)

    scheduled_transaction.delete()

    return HttpResponseRedirect(account.get_absolute_url())


@login_required
def scheduled_transaction_unmatch(request, scheduled_transaction_id):

    scheduled_transaction = get_object_or_404(ScheduledTransaction,
                                              id=scheduled_transaction_id,
                                              account__plaid_account__user=request.user)

    account = get_object_or_404(Account,
                                id=scheduled_transaction.account.id)

    scheduled_transaction.match = None
    scheduled_transaction.save()

    return HttpResponseRedirect(account.get_absolute_url())

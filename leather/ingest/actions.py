from annoying.functions import get_object_or_None
from decimal import Decimal
from django.conf import settings
from leather.accounts.models import Account, PlaidAccount
from leather.accounts.models import Transaction
from leather.forecasting.models import ScheduledTransaction
from plaid import Client
from stringscore import liquidmetal

import datetime
import json


def auto_rename_transaction(transaction):
    similar_transactions = Transaction.objects.filter(
        account=transaction.account,
        name=transaction.name
    ).order_by('-date')

    if len(similar_transactions):
        last_similar_transaction = similar_transactions[0]
        transaction.custom_name = last_similar_transaction.custom_name
        transaction.memo = last_similar_transaction.memo

    return transaction


def match_transactions(transaction, scheduled_transaction):
    scheduled_transaction.match = transaction

    transaction.custom_name = scheduled_transaction.name
    transaction.memo = scheduled_transaction.memo

    scheduled_transaction.save()
    transaction.save()


def remove_transactions(access_token, transaction_ids):
    for transaction_id in transaction_ids:
        trans = get_object_or_None(Transaction,
                                   account__plaid_account__access_token=access_token,
                                   plaid_id=transaction_id)
        if trans:
            trans.removal_requested = datetime.date.today()
            trans.save()


def transactions_do_match(transaction, scheduled_transaction):
    amount = scheduled_transaction.amount
    variance = amount * Decimal(.25)

    lower_bound = amount - variance
    upper_bound = amount + variance

    if transaction.amount >= lower_bound and transaction.amount <= upper_bound:
        left_similarity = liquidmetal.score(
            scheduled_transaction.name,
            transaction.name
        )
        right_similarity = liquidmetal.score(
            transaction.name,
            scheduled_transaction.name
        )
        if left_similarity > .90 or right_similarity > .90:
            return True

    return False


def update_or_create_accounts(plaid_account, accounts):
    for a in accounts:
        account = get_object_or_None(Account, plaid_id=a['_id'])

        if not account:
            account = Account(plaid_account=plaid_account,
                              plaid_id=a['_id'])

        if 'balance' in a:
            if 'available' in a['balance']:
                account.balance_available = a['balance']['available']
            if 'current' in a['balance']:
                account.balance_current = a['balance']['current']

        account.institution_type = a['institution_type']
        account.meta = a['meta']
        account.name = a['meta']['name']
        account.raw = a
        account.typ = a['type']

        account.save()


def update_plaid_account(access_token, from_date=None):
    if settings.DEBUG:
        Client.config({'url': 'https://tartan.plaid.com'})
    else:
        Client.config({'url': 'https://api.plaid.com'})

    plaid_account = get_object_or_None(PlaidAccount, access_token=access_token)

    if not plaid_account:
        plaid_account = PlaidAccount(access_token=access_token)
        plaid_account.save()

    client = Client(client_id=settings.PLAID_CLIENT_ID,
                    secret=settings.PLAID_SECRET,
                    access_token=plaid_account.access_token)

    opts = {'pending': True}

    if from_date:
        opts['gte'] = from_date

    response = json.loads(client.connect_get(opts).content.decode('utf-8'))

    if 'accounts' in response:
        update_or_create_accounts(plaid_account, response['accounts'])

    if 'transactions' in response:
        update_transactions(plaid_account, response['transactions'])


def update_transactions(plaid_account, transactions):
    for t in transactions:
        existing = get_object_or_None(Transaction,
                                      plaid_id=t['_id'],
                                      account__plaid_account=plaid_account)

        account = Account.objects.get(plaid_id=t['_account'])

        transaction = existing or Transaction(account=account)

        transaction.amount = t['amount']
        transaction.categories = t.get('category', [])
        transaction.category_id = t.get('category_id', None)
        transaction.date = t['date']
        transaction.meta = t['meta']
        transaction.name = t['name']
        transaction.pending = t['pending']
        transaction.plaid_id = t['_id']
        transaction.raw = t
        transaction.score = t['score']
        transaction.typ = t['type']

        transaction = auto_rename_transaction(transaction)

        if '_pendingTransaction' in t:
            pending_transaction = get_object_or_None(
                Transaction,
                plaid_id=t['_pendingTransaction'],
                account__plaid_account=plaid_account
            )

            if pending_transaction:

                transaction.custom_name = pending_transaction.custom_name
                transaction.memo = pending_transaction.memo

                try:
                    pending_transaction.scheduledtransaction.delete()

                except ScheduledTransaction.DoesNotExist:
                    pass

                pending_transaction.delete()

        transaction.save()

        if not existing:

            scheduled_transactions = ScheduledTransaction.objects.filter(
                account=account,
                match=None
            )

            for scheduled_transaction in scheduled_transactions:
                match = transactions_do_match(
                    transaction,
                    scheduled_transaction
                )
                if (match):
                    match_transactions(transaction, scheduled_transaction)

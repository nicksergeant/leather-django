from annoying.functions import get_object_or_None
from decimal import Decimal
from django.conf import settings
from leather.accounts.models import (Account,
                                     PlaidAccount,
                                     ScheduledTransaction,
                                     Transaction)
from plaid import Client
from stringscore import liquidmetal

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


def transactions_do_match(transaction, scheduled_transaction):
    amount = scheduled_transaction.amount
    variance = amount * Decimal(.10)

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
            account = Account(name=a['meta']['name'],
                              plaid_account=plaid_account,
                              plaid_id=a['_id'],
                              user=plaid_account.user)
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

        transaction = existing or \
            Transaction(account=account, awaiting_import=True)

        transaction.amount = t['amount']
        transaction.categories = t.get('category', [])
        transaction.category_id = t.get('category_id', None)
        transaction.date = t['date']
        transaction.meta = t['meta']
        transaction.name = t['name']
        transaction.plaid_id = t['_id']
        transaction.raw = t
        transaction.score = t['score']
        transaction.typ = t['type']

        transaction = auto_rename_transaction(transaction)

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

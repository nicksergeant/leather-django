from annoying.functions import get_object_or_None
from django.conf import settings
from leather.accounts.models import (Account,
                                     PlaidAccount,
                                     Transaction)
from plaid import Client

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


def update_or_create_accounts(plaid_account, accounts):
    for a in accounts:
        account = get_object_or_None(Account, plaid_id=a['_id'])

        if not account:
            account = Account(name=a['meta']['name'],
                              plaid_account=plaid_account,
                              plaid_id=a['_id'],
                              user=plaid_account.user,
                              typ=a['type'])
            account.save()

        else:
            account.user = plaid_account.user
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
            Transaction(account=account)

        transaction.amount = t['amount']
        transaction.date = t['date']
        transaction.name = t['name']
        transaction.pending = t['pending']
        transaction.plaid_categories = t.get('category', [])
        transaction.plaid_category_id = t.get('category_id', None)
        transaction.plaid_id = t['_id']
        transaction.plaid_meta = t['meta']
        transaction.plaid_score = t['score']
        transaction.typ = t['type']

        transaction = auto_rename_transaction(transaction)

        transaction.save()

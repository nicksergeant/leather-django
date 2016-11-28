from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from leather.accounts.models import PlaidAccount
from leather.ingest.actions import update_plaid_account


class Command(BaseCommand):
    help = 'Update all accounts and their transactions from Plaid'

    def handle(self, *args, **options):
        plaid_accounts = PlaidAccount.objects.all()

        self.stdout.write('Updating {} Plaid accounts...'.format(
            len(plaid_accounts)))

        for plaid_account in plaid_accounts:
            from_date = (datetime.now() - timedelta(days=15)) \
                .strftime('%Y-%m-%d')
            update_plaid_account(plaid_account.access_token, from_date)
            self.stdout.write('Updated {}.'.format(plaid_account))

        self.stdout.write('Finished.')

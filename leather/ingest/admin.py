from django.contrib import admin
from leather.accounts.models import PlaidAccount
from leather.ingest.models import Ingest


class IngestAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'user', 'institution', 'access_token_last_4',
                    'message', 'code')
    search_fields = ['raw']

    def access_token_last_4(self, obj):
        return obj.access_token[-4:]

    def institution(self, obj):
        plaid_account = PlaidAccount.objects.get(access_token=obj.access_token)

        accounts = plaid_account.account_set.all()

        if len(accounts):
            return accounts[0].institution_type
        else:
            return '-'

    def user(self, obj):
        plaid_account = PlaidAccount.objects.get(access_token=obj.access_token)
        return plaid_account.user


admin.site.register(Ingest, IngestAdmin)

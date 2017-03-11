from django.contrib import admin
from leather.accounts.models import PlaidAccount
from leather.ingest.models import Ingest


class IngestAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'user', 'access_token_last_4',
                    'message', 'code')
    search_fields = ['raw']

    def access_token_last_4(self, obj):
        return obj.access_token[-4:]

    def user(self, obj):
        plaid_account = PlaidAccount.objects.get(access_token=obj.access_token)
        return plaid_account.user


admin.site.register(Ingest, IngestAdmin)

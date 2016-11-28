from django.contrib import admin
from leather.accounts.models import Account, PlaidAccount, Transaction


class PlaidAccountAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ['raw', 'user__username']

admin.site.register(PlaidAccount, PlaidAccountAdmin)


class AccountAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'created_at')
    list_filter = ('created_at',)
    search_fields = ['raw']

admin.site.register(Account, AccountAdmin)


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'date', 'name', 'amount', 'pending')
    list_display_links = ('name',)
    list_filter = ('date', 'created_at')
    search_fields = ['raw']

admin.site.register(Transaction, TransactionAdmin)

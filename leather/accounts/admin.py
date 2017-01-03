from django.contrib import admin
from leather.accounts.models import (Account,
                                     PlaidAccount,
                                     ScheduledTransaction,
                                     Transaction)


class PlaidAccountAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ['raw', 'user__username']

admin.site.register(PlaidAccount, PlaidAccountAdmin)


class AccountAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ['user__username']

admin.site.register(Account, AccountAdmin)


class ScheduledTransactionAdmin(admin.ModelAdmin):
    list_display = ('name', 'account', 'date', 'amount',)
    list_display_links = ('name',)
    list_filter = ('date', 'created_at',)

admin.site.register(ScheduledTransaction, ScheduledTransactionAdmin)


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'date', 'name', 'amount', 'pending')
    list_display_links = ('name',)
    list_filter = ('date', 'created_at')
    search_fields = ['raw']

admin.site.register(Transaction, TransactionAdmin)

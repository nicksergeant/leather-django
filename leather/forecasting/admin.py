from django.contrib import admin
from leather.forecasting.models import ScheduledTransaction


class ScheduledTransactionAdmin(admin.ModelAdmin):
    list_display = ('name', 'account', 'date', 'amount',)
    list_display_links = ('name',)
    list_filter = ('date', 'created_at',)

admin.site.register(ScheduledTransaction, ScheduledTransactionAdmin)

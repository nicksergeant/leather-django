from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^transactions/$',
        views.all_transactions,
        name='all-transactions'),
    url(r'^accounts/(?P<account_id>[^/]+)/$',
        views.account_detail,
        name='account-detail'),
    url(r'^plaid-accounts/link/$',
        views.plaid_account_link,
        name='plaid-account-link'),
    url(r'^plaid-accounts/(?P<plaid_account_id>[^/]+)/delete/$',
        views.plaid_account_delete,
        name='plaid-account-delete'),
    url(r'^transactions/(?P<transaction_id>[^/]+)/delete/$',
        views.transaction_delete,
        name='transaction-delete')
]

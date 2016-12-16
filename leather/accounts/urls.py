from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^plaid-accounts/link/$',
        views.plaid_account_link,
        name='plaid-account-link'),
    url(r'^plaid-accounts/(?P<plaid_account_id>[^/]+)/delete/$',
        views.plaid_account_delete,
        name='plaid-account-delete')
]

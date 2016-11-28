from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^scheduled-transactions/add/$',
        views.scheduled_transaction_add,
        name='scheduled-transaction-add'),
    url(r'^scheduled-transactions/(?P<scheduled_transaction_id>[^/]+)/delete/$',
        views.scheduled_transaction_delete,
        name='scheduled-transaction-delete'),
    url(r'^scheduled-transactions/(?P<scheduled_transaction_id>[^/]+)/unmatch/$',
        views.scheduled_transaction_unmatch,
        name='scheduled-transaction-unmatch')
]

from django.conf.urls import include, url
from leather.api.view_sets import (AccountViewSet,
                                   PlaidAccountViewSet,
                                   ProfileViewSet,
                                   ScheduledTransactionViewSet,
                                   TransactionViewSet,
                                   UserViewSet)
from rest_framework import routers


api_router = routers.DefaultRouter()
api_router.register(r'accounts', AccountViewSet)
api_router.register(r'plaid_accounts', PlaidAccountViewSet)
api_router.register(r'profiles', ProfileViewSet)
api_router.register(r'scheduled_transactions', ScheduledTransactionViewSet)
api_router.register(r'transactions', TransactionViewSet)
api_router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^api/', include(api_router.urls)),
]

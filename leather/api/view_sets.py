from django.contrib.auth.models import User
from leather.accounts.models import Account, PlaidAccount, Transaction
from leather.api.serializers import (AccountSerializer,
                                     PlaidAccountSerializer,
                                     ProfileSerializer,
                                     ScheduledTransactionSerializer,
                                     TransactionSerializer,
                                     UserSerializer)
from leather.forecasting.models import ScheduledTransaction
from leather.users.models import Profile
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        return Account.objects.filter(plaid_account__user=self.request.user)


class PlaidAccountViewSet(viewsets.ModelViewSet):
    queryset = PlaidAccount.objects.all()
    serializer_class = PlaidAccountSerializer

    def get_queryset(self):
        return PlaidAccount.objects.filter(user=self.request.user)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)


class ScheduledTransactionViewSet(viewsets.ModelViewSet):
    queryset = ScheduledTransaction.objects.all()
    serializer_class = ScheduledTransactionSerializer

    def get_queryset(self):
        return ScheduledTransaction.objects \
            .filter(account__plaid_account__user=self.request.user,
                    match=None)


class TransactionViewSet(viewsets.ModelViewSet):
    filter_backends = (OrderingFilter,)
    ordering_fields = ('amount', 'date',)
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        queryset = Transaction.objects
        account = self.request.query_params.get('account', None)

        if account:
            queryset = queryset.filter(
                account__id=account,
                account__plaid_account__user=self.request.user
            )
        else:
            queryset = queryset.filter(
                account__plaid_account__user=self.request.user
            )

        return queryset


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

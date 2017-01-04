from django.contrib.auth.models import User
from leather.accounts.models import (Account,
                                     Transaction)
from leather.api.serializers import (AccountSerializer,
                                     ProfileSerializer,
                                     TransactionSerializer,
                                     UserSerializer)
from leather.users.models import Profile
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)


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
                account__user=self.request.user
            )
        else:
            queryset = queryset.filter(
                account__user=self.request.user
            )

        return queryset


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

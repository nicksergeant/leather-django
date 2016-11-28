from django.contrib.auth.models import User
from leather.accounts.models import Account, PlaidAccount, Transaction
from leather.forecasting.models import ScheduledTransaction
from leather.users.models import Profile
from rest_framework import serializers


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Account


class PlaidAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PlaidAccount


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile


class ScheduledTransactionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = ScheduledTransaction


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    account = AccountSerializer()
    id = serializers.ReadOnlyField()
    scheduledtransaction = ScheduledTransactionSerializer()

    class Meta:
        model = Transaction


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = ('url', 'username', 'email', 'is_staff', 'profile')
        model = User

from django.contrib.auth.models import User
from leather.accounts.models import (Account,
                                     PlaidAccount,
                                     ScheduledTransaction,
                                     Transaction)
from leather.users.models import Profile
from rest_framework import serializers


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        fields = '__all__'
        model = Account


class PlaidAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = '__all__'
        model = PlaidAccount


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = '__all__'
        model = Profile


class ScheduledTransactionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        fields = '__all__'
        model = ScheduledTransaction


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    account = AccountSerializer()
    id = serializers.ReadOnlyField()
    scheduledtransaction = ScheduledTransactionSerializer()

    class Meta:
        fields = '__all__'
        model = Transaction


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = ('url', 'username', 'email', 'is_staff', 'profile')
        model = User

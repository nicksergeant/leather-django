from django.contrib.auth.models import User
from leather.accounts.models import (Account,
                                     PlaidAccount,
                                     Transaction)
from leather.users.models import Profile
from rest_framework import serializers


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        fields = '__all__'
        model = Transaction


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    transactions = TransactionSerializer(many=True,
                                         read_only=True)

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


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = ('url', 'username', 'email', 'is_staff', 'profile')
        model = User

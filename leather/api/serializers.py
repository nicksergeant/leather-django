from django.contrib.auth.models import User
from leather.accounts.models import (Account,
                                     Transaction)
from leather.users.models import Profile
from rest_framework import serializers


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = (
            'account_id',
            'amount',
            'custom_name',
            'date',
            'id',
            'memo',
            'name',
            'pending',
            'pending_transaction',
            'url',
        )

        model = Transaction


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    transactions = TransactionSerializer(many=True,
                                         read_only=True)

    class Meta:
        fields = (
            'custom_name',
            'id',
            'name',
            'slug',
            'transactions',
            'typ',
            'updated_at',
            'url',
        )

        model = Account


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = (
            'id',
        )
        model = Profile


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = (
            'email',
            'is_staff',
            'profile',
            'url',
            'username',
        )

        model = User

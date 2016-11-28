from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db import models


class PlaidAccount(models.Model):
    access_token = models.CharField(max_length=200)
    public_token = models.CharField(max_length=200, blank=True, null=True)
    raw = JSONField(blank=True, null=True)
    user = models.ForeignKey(User, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Plaid Account for {} ({})'.format(self.user,
                                                  self.access_token[-4:])


class Account(models.Model):
    balance_available = models.DecimalField(blank=True,
                                            decimal_places=2,
                                            max_digits=10,
                                            null=True)
    balance_current = models.DecimalField(blank=True,
                                          decimal_places=2,
                                          max_digits=10,
                                          null=True)
    custom_name = models.CharField(max_length=255, blank=True, null=True)
    institution_type = models.CharField(max_length=50)
    meta = JSONField()
    name = models.CharField(max_length=255)
    plaid_account = models.ForeignKey(PlaidAccount)
    plaid_id = models.CharField(max_length=50)
    raw = JSONField()
    typ = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return '/accounts/{}/'.format(self.id)


class Transaction(models.Model):
    account = models.ForeignKey(Account)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    categories = JSONField(blank=True, null=True)
    category_id = models.CharField(max_length=50, blank=True, null=True)
    custom_name = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField()
    memo = models.CharField(max_length=255, blank=True, null=True)
    meta = JSONField()
    name = models.CharField(max_length=255)
    pending = models.BooleanField()
    plaid_id = models.CharField(max_length=50)
    removal_requested = models.DateField(blank=True, null=True)
    raw = JSONField()
    score = JSONField()
    typ = JSONField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return '/transactions/{}/'.format(self.id)

    class Meta:
        ordering = ['-date', '-created_at']

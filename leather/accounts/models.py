from decimal import Decimal
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.core.validators import MinValueValidator
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
    custom_name = models.CharField(max_length=255, blank=True, null=True)
    institution_type = models.CharField(max_length=50, blank=True, null=True)
    meta = JSONField(blank=True, null=True)
    name = models.CharField(max_length=255)
    plaid_account = models.ForeignKey(PlaidAccount, blank=True, null=True)
    plaid_id = models.CharField(max_length=50, blank=True, null=True)
    raw = JSONField(blank=True, null=True)
    typ = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey(User, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    account = models.ForeignKey(Account)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    awaiting_import = models.BooleanField(default=False)
    categories = JSONField(blank=True, null=True)
    category_id = models.CharField(max_length=50, blank=True, null=True)
    custom_name = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField()
    memo = models.CharField(max_length=255, blank=True, null=True)
    meta = JSONField(blank=True, null=True)
    name = models.CharField(max_length=255)
    pending = models.BooleanField(default=False)
    plaid_id = models.CharField(max_length=50, blank=True, null=True)
    removal_requested = models.DateField(blank=True, null=True)
    raw = JSONField(blank=True, null=True)
    score = JSONField(blank=True, null=True)
    typ = JSONField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return '/transactions/{}/'.format(self.id)

    class Meta:
        ordering = ['-date', '-created_at']


class ScheduledTransaction(models.Model):

    TYPE_CHOICES = (
        ('D', 'Deposit'),
        ('W', 'Withdrawal'),
    )

    account = models.ForeignKey(Account)
    amount = models.DecimalField(max_digits=10,
                                 decimal_places=2,
                                 validators=[
                                     MinValueValidator(Decimal('0.01'))
                                 ])
    date = models.DateField()
    memo = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    match = models.OneToOneField(Transaction, blank=True, null=True)
    typ = models.CharField(max_length=1, choices=TYPE_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-date', '-created_at']

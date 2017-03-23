from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db import models

from leather.accounts.utils import slugify_uniquely


class PlaidAccount(models.Model):
    access_token = models.CharField(max_length=200)
    public_token = models.CharField(max_length=200, blank=True, null=True)
    user = models.ForeignKey(User, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Plaid Account for {} ({})'.format(self.user,
                                                  self.access_token[-4:])


class Account(models.Model):
    custom_name = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    plaid_account = models.ForeignKey(PlaidAccount, blank=True, null=True)
    plaid_id = models.CharField(max_length=50, blank=True, null=True)
    slug = models.SlugField(max_length=255, blank=True)
    typ = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey(User, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify_uniquely(self.custom_name or self.name,
                                     Account,
                                     self.user)
        return super(Account, self).save(*args, **kwargs)


class Transaction(models.Model):
    account = models.ForeignKey(Account, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    custom_name = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField()
    memo = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    pending = models.BooleanField(default=False)
    pending_transaction = models.ForeignKey("Transaction",
                                            blank=True,
                                            null=True)
    plaid_categories = JSONField(blank=True, null=True)
    plaid_category_id = models.CharField(max_length=50, blank=True, null=True)
    plaid_id = models.CharField(max_length=50, blank=True, null=True)
    plaid_meta = JSONField(blank=True, null=True)
    plaid_score = JSONField(blank=True, null=True)
    typ = JSONField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return '/transactions/{}/'.format(self.id)

    class Meta:
        ordering = ['-date', '-created_at']

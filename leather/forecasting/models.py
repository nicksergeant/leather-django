from decimal import Decimal
from django.core.validators import MinValueValidator
from django.db import models
from leather.accounts.models import Account, Transaction


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

# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-27 16:23
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_transaction_removal_requested'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='pending_transaction',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.Transaction'),
        ),
    ]

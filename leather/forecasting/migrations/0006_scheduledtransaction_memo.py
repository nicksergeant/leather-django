# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-08 01:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forecasting', '0005_auto_20151227_0020'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduledtransaction',
            name='memo',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]

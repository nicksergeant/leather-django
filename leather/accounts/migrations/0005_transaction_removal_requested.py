# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-27 16:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20151211_1406'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='removal_requested',
            field=models.DateField(null=True),
        ),
    ]
# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-05 05:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_auto_20160102_0911'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='custom_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]

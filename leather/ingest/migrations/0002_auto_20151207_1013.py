# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-07 15:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingest',
            name='access_token',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ingest',
            name='code',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
from django.contrib.postgres.fields import JSONField
from django.db import models


class Ingest(models.Model):
    raw = JSONField()
    code = models.IntegerField()
    access_token = models.CharField(max_length=200)
    message = models.CharField(max_length=200)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

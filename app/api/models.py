from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=100, blank=True, null=True)
    is_lsu = models.BooleanField()

class Hotel(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    district = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    star = models.IntegerField()
    owner = models.CharField(max_length=100, blank=True, null=True)
    cert_start = models.DateTimeField(null=True)
    cert_end = models.DateTimeField(null=True)

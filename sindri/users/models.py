from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    user_type_choices=[
        ('customer','Customer'),
        ('provider','Service Provider')
    ]

    user_type=models.CharField(max_length=10, choices=user_type_choices) 
    city=models.CharField(max_length=10, blank=True, null=True)
    zipcode=models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.username
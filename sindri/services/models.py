from django.db import models
from users.models import CustomUser

# Create your models here.

class ServiceCategory(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class Service(models.Model):
    provider = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null= True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    location = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} ({self.provider.username})"
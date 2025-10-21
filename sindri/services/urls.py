# services/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.service_list, name='service_list'),       # List all services
    path('new/', views.create_service, name='create_service') # Add a new service
]

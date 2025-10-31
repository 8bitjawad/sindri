from django.urls import path
from . import views

urlpatterns = [
    path('analytics/provider/', views.provider_analytics, name='provider_analytics'),
]

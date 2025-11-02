from django.urls import path
from . import views

urlpatterns = [
    path('analytics/provider/', views.provider_analytics, name='provider_analytics'),
    path('api/provider-analytics/', views.provider_analytics_api, name='provider_analytics_api'),
    path('analytics/provider/react/', views.provider_analytics_react, name='provider_analytics_react'),
]

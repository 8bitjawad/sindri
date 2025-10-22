from django.urls import path
from . import views

urlpatterns = [
    path('book/<int:service_id>/', views.book_service, name='book_service'),
    path('booking_success/', views.booking_success, name='booking_success'),
]
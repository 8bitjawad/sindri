from django.urls import path
from . import views

urlpatterns = [
    path('book/<int:service_id>/', views.book_service, name='book_service'),
    path('booking_success/', views.booking_success, name='booking_success'),
    path('provider/bookings/', views.provider_bookings, name='provider_bookings'),
    path('provider/bookings/<int:booking_id>/approve/', views.approve_booking, name='approve_booking'),
    path('provider/bookings/<int:booking_id>/reject/', views.reject_booking, name='reject_booking'),
    path('provider/services/', views.provider_services, name='provider_services')
]
from django.urls import path, include
from . import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns=[
    path('register/', views.register, name='register'),
    path('', views.home,name='home'),
    path('login/', LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='home'), name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('customer/dashboard/', views.customer_dashboard, name='customer_dashboard'),
    path('provider/dashboard/', views.provider_dashboard, name='provider_dashboard'),
    path('test/', views.test, name='test'),
]
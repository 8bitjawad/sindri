from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')  
    else:
        form = CustomUserCreationForm()
    return render(request, 'users/register.html', {'form': form})

@login_required
def dashboard(request):
    if request.user.user_type == 'customer':
        return redirect('customer_dashboard')
    elif request.user.user_type == 'provider':
        return redirect('provider_dashboard')
    else:
        return redirect('home')
    
@login_required
def customer_dashboard(request):
    return render(request, 'users/customer_dashboard.html', {'user': request.user})

@login_required
def provider_dashboard(request):
    return render(request, 'users/provider_dashboard.html', {'user': request.user})  

def home(request):
    return render(request,"users/home.html")

def test(request):
    return render(request,"users/test.html")

def about(request):
    return render(request, "users/about.html")
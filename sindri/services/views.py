from django.shortcuts import render, redirect
from .models import Service
from .forms import ServiceForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
# Create your views here.

def service_list(request):
    services = Service.objects.filter(is_active=True)
    return render(request, 'services/services_list.html', {'services':services})

@login_required
def create_service(request):
    if request.user.user_type != 'provider':
        messages.error(request, "Only service providers can add services.")
        return redirect('service_list')  # send them back to service list

    if request.method == 'POST':
        form = ServiceForm(request.POST)
        if form.is_valid():
            service = form.save(commit=False)
            service.provider = request.user
            service.save()
            messages.success(request, "Service created successfully!")

            return redirect('service_list')
    else:
        form = ServiceForm()
    return render(request, 'services/services_form.html', {'form':form})
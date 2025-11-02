from django.shortcuts import render, redirect
from django.db.models import Count, Sum
from bookings.models import Booking
from services.models import Service
from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse

@login_required
def provider_analytics(request):

    provider = request.user
    if provider.user_type != 'provider':
        return redirect('home')
    
    total_bookings = Booking.objects.filter(service__provider=provider).count()

    completed_bookings = Booking.objects.filter(service__provider=provider, status='Completed').count()
    
    total_revenue = Booking.objects.filter(
    service__provider=provider, status='Completed').aggregate(revenue=Sum('service__price'))['revenue'] or 0

    monthly_data = (
        Booking.objects.filter(service__provider=provider)
        .values('created_at__month')
        .annotate(count=Count('id'))
        .order_by('created_at__month')
    )
    
    if not monthly_data.exists():
        months = ['No Data']
        counts = [0]
    else:
        months = [d['created_at__month'] for d in monthly_data]
        counts = [d['count'] for d in monthly_data]

    context = {
        'total_bookings': total_bookings,
        'completed_bookings': completed_bookings,
        'total_revenue': total_revenue,
        'months': json.dumps(months),
        'counts': json.dumps(counts),
    }
    service_data = Booking.objects.filter(service__provider=provider) \
    .values('service__title') \
    .annotate(count=Count('id')) \
    .order_by('-count')

    if service_data.exists():
        service_names = [d['service__title'] for d in service_data]
        service_counts = [d['count'] for d in service_data]
    else:
        service_names = ['No Bookings Yet']
        service_counts = [0]
    

    # Add to context
    context.update({
        'service_names': json.dumps(service_names),
        'service_counts': json.dumps(service_counts),
    })

    return render(request, 'dashboard/provider_analytics.html', context)
    
@login_required
def provider_analytics_react(request):
    if request.user.user_type != 'provider':
        return redirect('home')
    return render(request, 'dashboard/provider_analytics_react.html')

@login_required
def provider_analytics_api(request):

    provider = request.user
    if getattr(provider, 'user_type', 'None') != 'provider':
        return JsonResponse({'error': 'User is not a provider'}, status=403)
    
    total_bookings = Booking.objects.filter(service__provider=provider).count()

    completed_bookings = Booking.objects.filter(service__provider=provider, status='Completed').count()
    
    total_revenue = Booking.objects.filter(
    service__provider=provider, status='Completed').aggregate(revenue=Sum('service__price'))['revenue'] or 0

    monthly_data = (
        Booking.objects.filter(service__provider=provider)
        .values('created_at__month')
        .annotate(count=Count('id'))
        .order_by('created_at__month')
    )
    
    if not monthly_data.exists():
        months = ['No Data']
        counts = [0]
    else:
        months = [d['created_at__month'] for d in monthly_data]
        counts = [d['count'] for d in monthly_data]

    context = {
        'total_bookings': total_bookings,
        'completed_bookings': completed_bookings,
        'total_revenue': total_revenue,
        'months': json.dumps(months),
        'counts': json.dumps(counts),
    }
    service_data = Booking.objects.filter(service__provider=provider) \
    .values('service__title') \
    .annotate(count=Count('id')) \
    .order_by('-count')

    if service_data.exists():
        service_names = [d['service__title'] for d in service_data]
        service_counts = [d['count'] for d in service_data]
    else:
        service_names = ['No Bookings Yet']
        service_counts = [0]
    

    # Add to context
    context.update({
        'service_names': json.dumps(service_names),
        'service_counts': json.dumps(service_counts),
    })

    return JsonResponse(context)




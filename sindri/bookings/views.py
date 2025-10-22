from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Booking, SLOT_CHOICES
from .forms import BookingForm
from services.models import Service

# Create your views here.

@login_required
def book_service(request, service_id):
    service = get_object_or_404(Service, id=service_id)

    # Check if user already has a booking for this service
    existing_booking = Booking.objects.filter(user=request.user, service=service).exclude(status='Rejected').first()
    if existing_booking:
        return render(request, 'bookings/booking_exists.html', {'service': service, 'booking': existing_booking})

    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            booking = form.save(commit=False)
            booking.user = request.user
            booking.provider = service.provider
            booking.service = service
            
            # Conflict check for slot
            conflict = Booking.objects.filter(
                provider=service.provider,
                date=booking.date,
                slot=booking.slot,
                status='Confirmed'
            )
            if conflict.exists():
                form.add_error('slot', 'This slot is already booked. Please choose another one.')
            else:
                booking.save()
                return redirect('booking_success')
    else:
        form = BookingForm()

    # Filter available slots if a date has been chosen (optional, improves UX)
    selected_date = form['date'].value()  # gets the date input by user
    available_slots = [s[0] for s in SLOT_CHOICES]
    if selected_date:
        taken_slots = Booking.objects.filter(
            provider=service.provider,
            date=selected_date,
            status='Confirmed'
        ).values_list('slot', flat=True)
        form.fields['slot'].choices = [(s, s) for s in available_slots if s not in taken_slots]
    else:
        form.fields['slot'].choices = [(s, s) for s in available_slots]

    return render(request, 'bookings/book_service.html', {'service': service, 'form': form})

@login_required
def booking_success(request):
    return render(request, 'bookings/booking_success.html')

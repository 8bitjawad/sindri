from django import forms
from .models import Booking

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['date','slot','notes']
        widgets = {
            'date': forms.DateInput(
            attrs={
                'type': 'date',
                'class': 'border-2 border-black rounded p-2 w-full'
                }
            ),
            'slot': forms.Select(
            attrs={
                'class': 'border-2 border-black rounded p-2 w-full'
                }
            ),
            'notes': forms.Textarea(
            attrs={
                'rows': 3,
                'class': 'border-2 border-black rounded p-2 w-full'
                }
            ),
    }


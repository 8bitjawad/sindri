from django import forms
from .models import Service , ServiceCategory
class ServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ['category','title','description','price','location','is_active']

        category = forms.ModelChoiceField(
        queryset=ServiceCategory.objects.all(),
        empty_label="Select Category",
        widget=forms.Select(attrs={'class': 'w-full px-4 py-2 border border-black rounded-lg'})
    )

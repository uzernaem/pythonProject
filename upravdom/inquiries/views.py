from django.shortcuts import render, redirect
from .models import InquiryForm, SurveyForm, AnnouncementForm
# Create your views here.


def inquiry_post(request):
    form = InquiryForm(request.POST)
    if form.is_valid():
        inquiry = form.save()
        inquiry.refresh_from_db()
        inquiry.title = form.cleaned_data.get('title')
        inquiry.text = form.cleaned_data.get('text')
        inquiry.category = form.cleaned_data.get('category')
        return redirect('home')
    else:
        form = InquiryForm()
    return render(request, 'inquiry.html', {'form': form})


from django.shortcuts import render, redirect
from .models import InquiryForm, SurveyForm, AnnouncementForm

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Announcement
from .serializers import AnnouncementSerializer

# Create your views here.

class AnnouncementViews(APIView):
    def post(self, request):
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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


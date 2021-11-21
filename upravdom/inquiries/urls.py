from django.urls import path
from . import views
from django.urls import path

from .views import inquiry_post

urlpatterns = [
    path('inquiry_post/', inquiry_post, name='inquiry'),
]
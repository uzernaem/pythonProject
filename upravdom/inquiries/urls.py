from django.urls import path
from . import views
from django.urls import path

from .views import inquiry_post, AnnouncementViews

urlpatterns = [
    path('announcement_post/', AnnouncementViews.as_view()),
    # path('inquiry_post/', inquiry_post, name='inquiry'),
]
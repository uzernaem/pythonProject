from django.urls import path

from .views import AnnouncementViews

urlpatterns = [
    path('announcement_post/', AnnouncementViews.as_view()),
]
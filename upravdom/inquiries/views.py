from datetime import date
from django.db.models import Q

from django.db.models.functions import Now
from rest_framework import viewsets, generics, authentication
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import AnnouncementSerializer, ToDoSerializer, PollSerializer, NotificationSerializer, \
    CommentSerializer, VoteOptionSerializer, VoteSerializer, ProfileSerializer
from .models import Announcement, ToDo, Poll, Notification, Property, Comment, VoteOption, Vote, Profile


# Create your views here.
class ToDoViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ToDo.objects.filter(Q(inquiry_creator=user) | Q(todo_assigned_to=user))


class AnnouncementViewSet(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Announcement.objects.filter(Q(announcement_auto_invisible_date__gt=date.today(), announcement_is_visible=True) | Q(inquiry_creator=user))


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = [permissions.IsAuthenticated]


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(Q(inquiry_creator=user) | Q(notification_recipient=user))


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]


class VoteOptionViewSet(viewsets.ModelViewSet):
    queryset = VoteOption.objects.all()
    serializer_class = VoteOptionSerializer
    permission_classes = [permissions.IsAuthenticated]


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]




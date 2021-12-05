from django.urls import path, include
from rest_framework import routers

from .views import ToDoViewSet, PollViewSet, \
    PropertyViewSet, \
    CommentViewSet, \
    VoteOptionViewSet, VoteViewSet, ProfileViewSet, NotificationViewSet, \
    AnnouncementViewSet

router = routers.DefaultRouter()
router.register(r'announcements', AnnouncementViewSet, basename='Announcements')
router.register(r'todos', ToDoViewSet, basename='ToDos')
router.register(r'polls', PollViewSet)
router.register(r'notifications', NotificationViewSet, basename='Notifications')
router.register(r'properties', PropertyViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'vote_options', VoteOptionViewSet)
router.register(r'votes', VoteViewSet)
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


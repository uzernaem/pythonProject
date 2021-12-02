from django.urls import path, include
from rest_framework import routers

from .views import AnnouncementViewSet, ToDoViewSet, PollViewSet, NotificationViewSet, PropertyViewSet, CommentViewSet, \
    VoteOptionViewSet, VoteViewSet, ProfileViewSet

router = routers.DefaultRouter()
router.register(r'announcements', AnnouncementViewSet)
router.register(r'todos', ToDoViewSet)
router.register(r'polls', PollViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'vote_options', VoteOptionViewSet)
router.register(r'votes', VoteViewSet)
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


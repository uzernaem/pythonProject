from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.urls.conf import re_path
from django.views.generic import base
from rest_framework import routers
# from .views import ToDoViewSet, PollViewSet, \
#     PropertyViewSet, \
#     CommentViewSet, \
#     VoteOptionViewSet, VoteViewSet, ProfileViewSet, NotificationViewSet, \
#     AnnouncementViewSet
from .views import FileUploadView, announcement_detail, announcement_list, comment_list, file_download, file_upload, get_user, info_panel, notification_detail, notification_list, photo_upload, poll_detail, poll_list, post_vote, user_list, voteoption_list

router = routers.DefaultRouter()
# router.register(r'announcements', AnnouncementViewSet, basename='Announcements')
# router.register(r'todos', ToDoViewSet, basename='ToDos')
# router.register(r'polls', PollViewSet)
# router.register(r'notifications', NotificationViewSet, basename='Notifications')
# router.register(r'properties', PropertyViewSet)
# router.register(r'comments', CommentViewSet)
# router.register(r'vote_options', VoteOptionViewSet)
# router.register(r'votes', VoteViewSet)
# router.register(r'profiles', ProfileViewSet)

from .views import todo_list, todo_detail

urlpatterns = [
    path('', include(router.urls)),    
    re_path(r'^user$', get_user),
    re_path(r'^users$', user_list),
    re_path(r'^todos$', todo_list),
    re_path(r'^todos/(?P<pk>[0-9]+)$', todo_detail),
    re_path(r'^announcements$', announcement_list),
    re_path(r'^announcements/(?P<pk>[0-9]+)$', announcement_detail),
    re_path(r'^notifications$', notification_list),
    re_path(r'^notifications/(?P<pk>[0-9]+)$', notification_detail),
    re_path(r'^comments/(?P<inquiry_id>[0-9]+)$', comment_list),
    re_path(r'^polls$', poll_list),    
    re_path(r'^polls/(?P<pk>[0-9]+)$', poll_detail),
    re_path(r'^voteoptions$', voteoption_list),
    re_path(r'^vote$', post_vote),
    re_path(r'^info$', info_panel),
    re_path(r'^upload$', FileUploadView.as_view()),
    re_path(r'^files$', file_upload),
    re_path(r'^files/(?P<pk>[0-9]+)$', file_download),
    re_path(r'^photo/(?P<pk>[0-9]+)$', photo_upload),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
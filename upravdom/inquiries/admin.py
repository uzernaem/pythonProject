from ast import In
from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Profile, ToDo, Poll, Announcement, Notification, Comment, VoteOption, Vote, Property, Ownership, Info

# Register your models here.
admin.site.register(Profile)
# admin.site.register(ToDo)
# admin.site.register(Poll)
# admin.site.register(Announcement)
# admin.site.register(Notification)
# admin.site.register(Comment)
# admin.site.register(VoteOption)
# admin.site.register(Vote)
admin.site.register(Property)
admin.site.register(Ownership)
# admin.site.register(Image)
admin.site.register(Info)

admin.site.unregister(Group)
from django.contrib import admin
from .models import Person, ToDo, Survey, Announcement, Comment, Selection, Vote, Property, Ownership, Image

# Register your models here.
admin.site.register(ToDo)
admin.site.register(Survey)
admin.site.register(Announcement)
admin.site.register(Person)
admin.site.register(Comment)
admin.site.register(Selection)
admin.site.register(Vote)
admin.site.register(Property)
admin.site.register(Ownership)
admin.site.register(Image)

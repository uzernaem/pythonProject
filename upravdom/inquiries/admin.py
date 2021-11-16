from django.contrib import admin
from .models import Author, Inquiry

# Register your models here.
admin.site.register(Inquiry)
admin.site.register(Author)
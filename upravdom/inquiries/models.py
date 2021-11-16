import uuid
from django.db import models
from django.urls import reverse


# Create your models here.

class Inquiry(models.Model):
    """Модель заявки"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Идентификатор заявки')
    title = models.CharField(max_length=256, help_text='Введите заголовок заявки')
    text = models.TextField(max_length=4096, help_text='Введите текст заявки')
    date = models.DateTimeField
    author = models.ForeignKey('Author', on_delete=models.SET_NULL, null=True)
    done = models.BooleanField

    def __str__(self):
        """Строка для вывода объекта класса Заявка"""
        return self.title

    def get_absolute_url(self):
        """URL для доступа к объекту класса заявка"""
        return reverse('inquiry-detail', args=[str(self.id)])

class Author(models.Model):
    """Модель создателя заявки"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Идентификатор создателя')
    login = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    user_pic = models.BinaryField
    is_manager = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)

    class Meta:
        ordering = ['is_manager', 'full_name']

    def get_absolute_url(self):
        """URL для доступа к объекту класса создатель"""
        return reverse('author-detail', args=[str(self.id)])

    def __str__(self):
        """Строка для вывода объекта класса Заявка"""
        return self.full_name


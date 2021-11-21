from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse
from django.contrib.auth.models import User


# Create your models here.

class Inquiry(models.Model):
    """Модель заявки"""
    id = models.IntegerField(primary_key=True, help_text='Идентификатор заявки')
    title = models.CharField(max_length=256, help_text='Введите заголовок заявки')
    text = models.TextField(max_length=4096, help_text='Введите текст заявки')
    date = models.DateTimeField
    done = models.BooleanField

    class Meta:
        abstract = True

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        """URL для доступа к объекту класса заявка"""
        return reverse('inquiry-detail', args=[str(self.id)])


class Image(models.Model):
    """Изображения в заявке"""
    inquiry = models.ForeignKey('ToDo', on_delete=models.CASCADE, help_text='Заявка')
    image = models.BinaryField(help_text='Изображение')


class ToDo(Inquiry):
    """Модель заявки на исполнение"""
    author = models.ForeignKey('Person', on_delete=models.SET_NULL, null=True, related_name='todo_author')
    TASK_STATUS = (
        ('n', 'Новая'),
        ('w', 'В работе'),
        ('r', 'На проверке'),
        ('c', 'Завершена'),
    )
    TASK_PRIORITY = (
        ('3', 'Низкий'),
        ('2', 'Средний'),
        ('1', 'Высокий'),
        ('0', 'Наивысший'),
    )
    TASK_CATEGORY = (
        ('1', 'Сантехника'),
        ('2', 'Электрика'),
        ('3', 'Ремонтные работы'),
        ('4', 'Лифт'),
        ('5', 'Общедомовая территория'),
    )
    priority = models.CharField(
        max_length=1,
        choices=TASK_PRIORITY,
        blank=True,
        default='2',
        help_text='Приоритет заявки',
    )
    assigned_person = models.ForeignKey('Person', on_delete=models.SET_NULL, null=True, related_name='assignee')
    status = models.CharField(
        max_length=1,
        choices=TASK_STATUS,
        blank=True,
        default='n',
        help_text='Статус заявки',
    )
    category = models.CharField(
        max_length=1,
        choices=TASK_CATEGORY,
        blank=True,
        default='1',
        help_text='Категория заявки',
    )


class Survey(Inquiry):
    """Модель опроса"""
    author = models.ForeignKey('Person', on_delete=models.SET_NULL, null=True, related_name='survey_author')
    deadline = models.DateTimeField


class Announcement(Inquiry):
    """Модель объявления"""
    author = models.ForeignKey('Person', on_delete=models.SET_NULL, null=True, related_name='announcement_author')
    deadline = models.DateTimeField


class Property(models.Model):
    """Модель помещения"""
    id = models.IntegerField(primary_key=True, help_text='Идентификатор помещения')
    street = models.CharField(max_length=100, help_text='Улица')
    building = models.IntegerField(help_text='Номер дома')
    number = models.IntegerField(help_text='Номер помещения')
    entrance = models.IntegerField(help_text='Номер подъезда')
    flat = models.IntegerField(help_text='Номер этажа')
    area = models.IntegerField(help_text='Площадь помещения')
    PROPERTY_TYPE = (
        ('0', 'Жилое'),
        ('1', 'Коммерческое'),
    )
    priority = models.CharField(
        max_length=1,
        choices=PROPERTY_TYPE,
        blank=True,
        default='0',
        help_text='Тип помещения',
    )

    def __str__(self):
        return f'ул. {self.street}, д. {self.building}, кв. {self.number}'


class Ownership(models.Model):
    """Модель отношения помещение-собственник"""
    owner = models.ForeignKey('Person', on_delete=models.CASCADE, null=True)
    property = models.ForeignKey('Property', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.owner} - {self.property}'


class Comment(models.Model):
    """Модель комментария в заявке на исполнение"""
    task = models.ForeignKey('ToDo', on_delete=models.SET_NULL, null=True)
    text = models.TextField(max_length=4096, help_text='Введите текст комментария')
    author = models.ForeignKey('Person', on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField


class Selection(models.Model):
    """Модель варианта голосования"""
    survey = models.ForeignKey('Survey', on_delete=models.SET_NULL, null=True)
    text = models.TextField(max_length=512, help_text='Текст варианта голосования')

    def __str__(self):
        return f'{self.text}'


class Vote(models.Model):
    """Модель голоса"""
    survey = models.ForeignKey('Survey', on_delete=models.CASCADE, null=True)
    person = models.ForeignKey('Person', on_delete=models.CASCADE, null=True)
    selection = models.ForeignKey('Selection', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.person}'


class Person(models.Model):
    """Модель человека в системе"""
    # id = models.IntegerField(help_text='Идентификатор')
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE, verbose_name='Пользователь')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=150)
    phone_number = models.CharField(max_length=100)
    photo = models.BinaryField
    is_manager = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)

    class Meta:
        ordering = ['is_manager', 'user']

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def update_person_signal(sender, instance, created, **kwargs):
    if created:
        Person.objects.create(user=instance)
    instance.person.save()

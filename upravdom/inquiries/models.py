from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.forms import ModelForm, DateInput


# Create your models here.
class Inquiry(models.Model):
    """Модель заявки на исполнение"""
    inquiry_id = models.IntegerField(primary_key=True, help_text='Идентификатор заявки')
    inquiry_title = models.CharField(max_length=256, help_text='Введите заголовок заявки')
    inquiry_text = models.TextField(max_length=4096, help_text='Введите текст заявки')
    inquiry_creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    inquiry_creation_date = models.DateTimeField
    inquiry_is_done = models.BooleanField


class InquiryForm(ModelForm):
    class Meta:
        model = Inquiry
        fields = ['inquiry_title', 'inquiry_text']


class ToDo(ModelForm):
    inquiry = models.OneToOneField('Inquiry', primary_key=True, on_delete=models.CASCADE)
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
    todo_priority = models.CharField(
        max_length=1,
        choices=TASK_PRIORITY,
        blank=True,
        default='2',
        help_text='Приоритет заявки',
    )
    todo_assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assignee')
    todo_status = models.CharField(
        max_length=1,
        choices=TASK_STATUS,
        blank=True,
        default='n',
        help_text='Статус заявки',
    )
    todo_category = models.CharField(
        max_length=1,
        choices=TASK_CATEGORY,
        blank=True,
        default='1',
        help_text='Категория заявки',
    )


class Image(models.Model):
    """Изображения в заявке"""
    inquiry = models.ForeignKey('Inquiry', on_delete=models.CASCADE, help_text='Заявка')
    image = models.BinaryField(help_text='Изображение')


"""DEPRECATION"""
class Poll(models.Model):
    """Модель опроса"""
    inquiry = models.OneToOneField('Inquiry', primary_key=True, on_delete=models.CASCADE)
    poll_deadline = models.DateField()


class Announcement(models.Model):
    """Модель объявления"""
    inquiry = models.OneToOneField('Inquiry', primary_key=True, on_delete=models.CASCADE)
    announcement_is_visible = models.BooleanField(default=False)
    announcement_auto_invisible_date = models.DateField()
    ANNOUNCEMENT_CATEGORY = (
        ('1', 'Placeholder'),
        ('2', 'Placeholder'),
        ('3', 'Placeholder'),
        ('4', 'Placeholder'),
        ('5', 'Placeholder'),
    )
    category = models.CharField(
        max_length=1,
        choices=ANNOUNCEMENT_CATEGORY,
        blank=True,
        default='1',
        help_text='Категория заявки',
    )


class Property(models.Model):
    """Модель помещения"""
    property_id = models.IntegerField(primary_key=True, help_text='Идентификатор помещения')
    property_street_name = models.CharField(max_length=100, help_text='Улица')
    property_building_number = models.IntegerField(help_text='Номер дома')
    property_entrance_number = models.IntegerField(help_text='Номер подъезда')
    property_flat_number = models.IntegerField(help_text='Номер этажа')
    property_room_number = models.IntegerField(help_text='Номер помещения')
    property_area = models.IntegerField(help_text='Площадь помещения')
    PROPERTY_TYPES = (
        ('0', 'Жилое'),
        ('1', 'Коммерческое'),
    )
    property_type = models.CharField(
        max_length=1,
        choices=PROPERTY_TYPES,
        blank=True,
        default='0',
        help_text='Тип помещения',
    )

    def __str__(self):
        return f'ул. {self.street}, д. {self.building}, кв. {self.number}'


class Ownership(models.Model):
    """Модель отношения помещение-собственник"""
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    property = models.ForeignKey('Property', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.owner} - {self.property}'


class Comment(models.Model):
    """Модель комментария в заявке на исполнение"""
    inquiry = models.ForeignKey('Inquiry', on_delete=models.SET_NULL, null=True)
    comment_text = models.TextField(max_length=4096, help_text='Введите текст комментария')
    comment_creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    comment_creation_datetime = models.DateTimeField


class VoteOption(models.Model):
    """Модель варианта голосования"""
    poll = models.ForeignKey('Poll', on_delete=models.CASCADE, null=True)
    vote_option_text = models.TextField(max_length=512, help_text='Текст варианта голосования')

    def __str__(self):
        return f'{self.text}'


class Vote(models.Model):
    """Модель голоса"""
    voter = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    selected_option = models.ForeignKey('VoteOption', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.voter}'


class Profile(models.Model):
    """Профиль пользователя системы"""
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
        return f'{self.first_name} {self.last_name}'


@receiver(post_save, sender=User)
def update_profile_signal(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()

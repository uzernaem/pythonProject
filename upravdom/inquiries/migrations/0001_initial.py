# Generated by Django 3.2.9 on 2021-12-05 17:06

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Inquiry',
            fields=[
                ('inquiry_id', models.AutoField(help_text='Идентификатор заявки', primary_key=True, serialize=False)),
                ('inquiry_title', models.CharField(help_text='Заголовок заявки', max_length=256)),
                ('inquiry_text', models.TextField(help_text='Текст заявки', max_length=4096)),
                ('inquiry_creation_date', models.DateTimeField(help_text='Дата создания заявки')),
                ('inquiry_is_done', models.BooleanField(default=False, help_text='Признак завершения заявки')),
                ('inquiry_creator', models.ForeignKey(help_text='Создатель заявки', null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(help_text='Пользователь', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='auth.user')),
                ('first_name', models.CharField(help_text='Имя пользователя', max_length=100)),
                ('last_name', models.CharField(help_text='Фамилия пользователя', max_length=100)),
                ('email', models.EmailField(help_text='Адрес электронной почты', max_length=150)),
                ('phone_number', models.CharField(help_text='Номер телефона', max_length=100)),
                ('photo', models.BinaryField(help_text='Фотография пользователя', null=True)),
                ('is_manager', models.BooleanField(default=False, help_text='Признак управляющего')),
                ('is_blocked', models.BooleanField(default=False, help_text='Признак блокировки')),
            ],
            options={
                'ordering': ['is_manager', 'user'],
            },
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('property_id', models.AutoField(help_text='Идентификатор помещения', primary_key=True, serialize=False)),
                ('property_street_name', models.CharField(help_text='Улица', max_length=100)),
                ('property_building_number', models.IntegerField(help_text='Номер дома')),
                ('property_entrance_number', models.IntegerField(help_text='Номер подъезда')),
                ('property_flat_number', models.IntegerField(help_text='Номер этажа')),
                ('property_room_number', models.IntegerField(help_text='Номер помещения')),
                ('property_area', models.IntegerField(help_text='Площадь помещения')),
                ('property_type', models.CharField(choices=[('0', 'Жилое'), ('1', 'Коммерческое')], default='0', help_text='Тип помещения', max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='VoteOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vote_option_text', models.TextField(help_text='Текст варианта голосования', max_length=512)),
            ],
        ),
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('inquiry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='inquiries.inquiry')),
                ('announcement_is_visible', models.BooleanField(default=False, help_text='Признак публикации')),
                ('announcement_auto_invisible_date', models.DateField(help_text='Дата актуальности')),
                ('announcement_category', models.CharField(choices=[('0', 'Placeholder'), ('1', 'Placeholder'), ('2', 'Placeholder'), ('3', 'Placeholder'), ('4', 'Placeholder'), ('5', 'Placeholder')], default='0', help_text='Категория объявления', max_length=1)),
            ],
            bases=('inquiries.inquiry',),
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('inquiry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='inquiries.inquiry')),
                ('poll_open', models.BooleanField(help_text='Открытое голосование')),
                ('poll_preliminary_results', models.BooleanField(help_text='Предварительные результаты')),
                ('poll_deadline', models.DateField(help_text='Дата завершения голосования')),
                ('poll_variants', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, size=None)),
            ],
            bases=('inquiries.inquiry',),
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('selected_option', models.ForeignKey(help_text='Выбранный вариант', on_delete=django.db.models.deletion.CASCADE, to='inquiries.voteoption')),
                ('voter', models.ForeignKey(help_text='Пользователь', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ownership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner', models.ForeignKey(help_text='Владелец помещения', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('property', models.ForeignKey(help_text='Помещение', on_delete=django.db.models.deletion.CASCADE, to='inquiries.property')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.BinaryField(help_text='Изображение')),
                ('inquiry', models.ForeignKey(help_text='Заявка', on_delete=django.db.models.deletion.CASCADE, to='inquiries.inquiry')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('comment_id', models.AutoField(help_text='ID комментария', primary_key=True, serialize=False)),
                ('comment_text', models.TextField(help_text='Текст комментария', max_length=4096)),
                ('comment_creation_datetime', models.DateTimeField(help_text='Дата и время комментария')),
                ('comment_creator', models.ForeignKey(help_text='Автор комментария', null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('inquiry', models.ForeignKey(help_text='Заявка', on_delete=django.db.models.deletion.CASCADE, to='inquiries.inquiry')),
            ],
        ),
        migrations.AddField(
            model_name='voteoption',
            name='poll',
            field=models.ForeignKey(help_text='Голосование', on_delete=django.db.models.deletion.CASCADE, to='inquiries.poll'),
        ),
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('inquiry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='inquiries.inquiry')),
                ('todo_priority', models.CharField(blank=True, choices=[('3', 'Низкий'), ('2', 'Средний'), ('1', 'Высокий'), ('0', 'Наивысший')], default='2', help_text='Приоритет заявки', max_length=1)),
                ('todo_status', models.CharField(blank=True, choices=[('n', 'Новая'), ('w', 'В работе'), ('r', 'На проверке'), ('c', 'Завершена')], default='n', help_text='Статус заявки', max_length=1)),
                ('todo_category', models.CharField(blank=True, choices=[('1', 'Сантехника'), ('2', 'Электрика'), ('3', 'Ремонтные работы'), ('4', 'Лифт'), ('5', 'Общедомовая территория')], default='1', help_text='Категория заявки', max_length=1)),
                ('todo_assigned_to', models.ForeignKey(blank=True, help_text='Исполнитель заявки', null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            bases=('inquiries.inquiry',),
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('inquiry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='inquiries.inquiry')),
                ('notification_is_read', models.BooleanField(default=False, help_text='Признак прочтения')),
                ('notification_category', models.CharField(choices=[('0', 'Общее'), ('1', 'Оплата счетов'), ('2', 'Показания счётчиков'), ('3', 'Placeholder'), ('4', 'Placeholder'), ('5', 'Placeholder')], default='0', help_text='Категория уведомления', max_length=1)),
                ('notification_recipient', models.ForeignKey(help_text='Получатель', null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            bases=('inquiries.inquiry',),
        ),
    ]
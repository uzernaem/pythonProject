# Generated by Django 3.2.9 on 2021-11-16 14:41

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, help_text='Идентификатор создателя', primary_key=True, serialize=False)),
                ('login', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('full_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=100)),
                ('is_manager', models.BooleanField(default=False)),
                ('is_blocked', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['is_manager', 'full_name'],
            },
        ),
        migrations.CreateModel(
            name='Inquiry',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, help_text='Идентификатор заявки', primary_key=True, serialize=False)),
                ('title', models.CharField(help_text='Введите заголовок заявки', max_length=256)),
                ('text', models.TextField(help_text='Введите текст заявки', max_length=4096)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='inquiries.author')),
            ],
        ),
    ]

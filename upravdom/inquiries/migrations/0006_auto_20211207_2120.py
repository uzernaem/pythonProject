# Generated by Django 3.2.9 on 2021-12-07 16:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inquiries', '0005_auto_20211206_2007'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='email',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='is_blocked',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='phone_number',
        ),
    ]
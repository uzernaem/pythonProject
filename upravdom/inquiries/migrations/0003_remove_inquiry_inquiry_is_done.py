# Generated by Django 3.2.9 on 2021-12-24 14:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inquiries', '0002_profile_phone_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inquiry',
            name='inquiry_is_done',
        ),
    ]

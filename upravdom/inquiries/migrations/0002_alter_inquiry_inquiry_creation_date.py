# Generated by Django 3.2.9 on 2021-12-06 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inquiries', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inquiry',
            name='inquiry_creation_date',
            field=models.DateTimeField(auto_now_add=True, help_text='Дата создания заявки'),
        ),
    ]

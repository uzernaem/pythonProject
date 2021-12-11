# Generated by Django 3.2.9 on 2021-12-10 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inquiries', '0006_auto_20211207_2120'),
    ]

    operations = [
        migrations.CreateModel(
            name='ToDoCategory',
            fields=[
                ('category_id', models.AutoField(help_text='Идентификатор категории', primary_key=True, serialize=False)),
                ('category_name', models.CharField(help_text='Имя категории', max_length=256)),
            ],
        ),
    ]

# Generated by Django 3.2.9 on 2021-12-06 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inquiries', '0004_alter_inquiry_inquiry_creator'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='poll',
            name='poll_variants',
        ),
        migrations.AlterField(
            model_name='announcement',
            name='announcement_auto_invisible_date',
            field=models.DateField(blank=True, help_text='Дата актуальности', null=True),
        ),
        migrations.AlterField(
            model_name='announcement',
            name='announcement_is_visible',
            field=models.BooleanField(default=True, help_text='Признак публикации'),
        ),
        migrations.AlterField(
            model_name='inquiry',
            name='inquiry_is_done',
            field=models.BooleanField(blank=True, default=False, help_text='Признак завершения заявки'),
        ),
        migrations.AlterField(
            model_name='poll',
            name='poll_open',
            field=models.BooleanField(blank=True, default=False, help_text='Открытое голосование'),
        ),
        migrations.AlterField(
            model_name='poll',
            name='poll_preliminary_results',
            field=models.BooleanField(blank=True, default=False, help_text='Предварительные результаты'),
        ),
    ]
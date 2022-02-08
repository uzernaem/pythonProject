# Generated by Django 3.2.9 on 2022-02-08 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inquiries', '0012_alter_attachment_file'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='info',
            options={'verbose_name': 'информационное сообщение', 'verbose_name_plural': 'информационные сообщения'},
        ),
        migrations.AlterModelOptions(
            name='ownership',
            options={'verbose_name': 'владение недвижимостью', 'verbose_name_plural': 'владение недвижимостью'},
        ),
        migrations.AlterModelOptions(
            name='profile',
            options={'ordering': ['is_manager', 'user'], 'verbose_name': 'Дополнительная информация профиля', 'verbose_name_plural': 'Дополнительная информация профиля'},
        ),
        migrations.AlterModelOptions(
            name='property',
            options={'verbose_name': 'помещение', 'verbose_name_plural': 'помещения'},
        ),
        migrations.RemoveField(
            model_name='profile',
            name='photo',
        ),
        migrations.AlterField(
            model_name='info',
            name='info_text',
            field=models.TextField(max_length=4096, verbose_name='Текст'),
        ),
        migrations.AlterField(
            model_name='info',
            name='info_title',
            field=models.CharField(max_length=256, verbose_name='Заголовок'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='is_manager',
            field=models.BooleanField(default=False, verbose_name='Признак управляющего'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='phone_number',
            field=models.CharField(max_length=100, verbose_name='Номер телефона'),
        ),
        migrations.AlterField(
            model_name='property',
            name='property_area',
            field=models.IntegerField(verbose_name='Площадь помещения'),
        ),
        migrations.AlterField(
            model_name='property',
            name='property_building_number',
            field=models.IntegerField(verbose_name='Номер дома'),
        ),
        migrations.AlterField(
            model_name='property',
            name='property_entrance_number',
            field=models.IntegerField(verbose_name='Номер подъезда'),
        ),
        migrations.AlterField(
            model_name='property',
            name='property_flat_number',
            field=models.IntegerField(verbose_name='Номер этажа'),
        ),
        migrations.AlterField(
            model_name='property',
            name='property_room_number',
            field=models.IntegerField(verbose_name='Номер помещения'),
        ),
        migrations.AlterField(
            model_name='property',
            name='property_street_name',
            field=models.CharField(max_length=100, verbose_name='Улица'),
        ),
        migrations.AlterField(
            model_name='property',
            name='property_type',
            field=models.CharField(choices=[('0', 'Жилое'), ('1', 'Коммерческое')], default='0', max_length=1, verbose_name='Тип помещения'),
        ),
        migrations.DeleteModel(
            name='Image',
        ),
    ]

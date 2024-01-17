# Generated by Django 3.2.18 on 2023-08-18 03:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('parkstay', '0139_auto_20230811_1700'),
    ]

    operations = [
        migrations.AddField(
            model_name='mybookingnotice',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='notice',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2021-01-28 04:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parkstay', '0067_auto_20210104_1646'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='booking_change_in_progress',
            field=models.BooleanField(default=False),
        ),
    ]
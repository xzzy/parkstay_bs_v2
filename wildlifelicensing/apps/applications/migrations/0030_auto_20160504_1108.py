# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-05-04 03:08
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0029_auto_20160504_1104'),
    ]

    operations = [
        migrations.RenameField(
            model_name='emaillogentry',
            old_name='to_email',
            new_name='to',
        ),
    ]

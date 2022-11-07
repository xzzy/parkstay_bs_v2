# Generated by Django 3.2.12 on 2022-07-07 08:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('parkstay', '0130_booking_booking_hash'),
    ]

    operations = [
        migrations.CreateModel(
            name='CampgroundPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=500)),
                ('permission_group', models.SmallIntegerField(choices=[(0, 'Create Booking on Behalf of Customer')], default=0)),
                ('active', models.BooleanField(default=True)),
                ('campground', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='campground_permissions', to='parkstay.campground')),
            ],
        ),
    ]
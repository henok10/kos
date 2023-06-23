# Generated by Django 4.1.7 on 2023-04-23 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0031_remove_listing_available_room'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='listing_type',
            field=models.CharField(choices=[('Rumah Kos', 'Rumah Kos')], max_length=20),
        ),
        migrations.AlterField(
            model_name='listing',
            name='property_status',
            field=models.CharField(blank=True, choices=[('Rent', 'Rent')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='rental_frequency',
            field=models.CharField(blank=True, choices=[('Year', 'Year'), ('Month', 'Month'), ('Week', 'Week'), ('Day', 'Day')], max_length=20, null=True),
        ),
    ]

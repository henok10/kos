# Generated by Django 4.1.3 on 2023-02-16 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0009_remove_listing_borough'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='borough',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]

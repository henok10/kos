# Generated by Django 4.2.2 on 2023-07-20 17:33

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0003_transaction_nominal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='picture1',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='picture2',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='picture3',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='picture4',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='picture5',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True),
        ),
    ]
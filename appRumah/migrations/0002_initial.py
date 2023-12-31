# Generated by Django 4.2.2 on 2023-11-11 01:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('appUsers', '0001_initial'),
        ('appRumah', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='customer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='appUsers.customer'),
        ),
        migrations.AddField(
            model_name='transaction',
            name='kamar',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='appRumah.kamar'),
        ),
        migrations.AddField(
            model_name='transaction',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='rumah',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='rulerumah',
            name='rumah',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rulerumah', to='appRumah.rumah'),
        ),
        migrations.AddField(
            model_name='rulekamar',
            name='kamar',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rulekamar', to='appRumah.kamar'),
        ),
        migrations.AddField(
            model_name='review',
            name='rumah',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='review', to='appRumah.rumah'),
        ),
        migrations.AddField(
            model_name='review',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='kamar',
            name='rumah',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='kamar', to='appRumah.rumah'),
        ),
        migrations.AddField(
            model_name='fasilitasrumah',
            name='rumah',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fasilitasrumah', to='appRumah.rumah'),
        ),
        migrations.AddField(
            model_name='fasilitaskamar',
            name='kamar',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fasilitaskamar', to='appRumah.kamar'),
        ),
    ]

# Generated by Django 5.1 on 2024-09-24 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodapp', '0005_rename_pendingorder_finalorder'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='finalorder',
            name='quantity',
            field=models.IntegerField(blank=True, default=1),
        ),
    ]

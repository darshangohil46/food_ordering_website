# Generated by Django 5.1 on 2024-09-24 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodapp', '0007_finalorder_last_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='finalorder',
            name='ordered',
            field=models.BooleanField(default=False),
        ),
    ]

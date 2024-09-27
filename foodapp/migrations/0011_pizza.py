# Generated by Django 5.1 on 2024-09-26 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodapp', '0010_rename_order_details_finalorder_cart_details'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pizza',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img_url', models.URLField(max_length=500)),
                ('price', models.CharField(max_length=100)),
                ('restaurant_name', models.CharField(max_length=255)),
                ('type', models.CharField(max_length=255)),
                ('address', models.TextField()),
            ],
        ),
    ]

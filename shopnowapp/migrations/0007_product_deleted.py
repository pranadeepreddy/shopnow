# Generated by Django 2.0.5 on 2018-07-15 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopnowapp', '0006_auto_20180709_2049'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]

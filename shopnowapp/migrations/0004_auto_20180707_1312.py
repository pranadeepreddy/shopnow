# Generated by Django 2.0.5 on 2018-07-07 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopnowapp', '0003_auto_20180705_1803'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='count',
            field=models.IntegerField(default=1),
        ),
    ]

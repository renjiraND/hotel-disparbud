# Generated by Django 2.2 on 2019-04-25 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_hotel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='cert_end',
            field=models.TimeField(null=True),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='cert_start',
            field=models.TimeField(null=True),
        ),
    ]

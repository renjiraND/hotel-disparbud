# Generated by Django 2.2 on 2019-04-25 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20190425_1556'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='cert_end',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='cert_start',
            field=models.DateField(null=True),
        ),
    ]

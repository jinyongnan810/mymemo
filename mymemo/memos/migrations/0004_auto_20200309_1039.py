# Generated by Django 3.0.4 on 2020-03-09 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memos', '0003_auto_20200309_1037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memo',
            name='file_list',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='memo',
            name='image_list',
            field=models.TextField(blank=True, null=True),
        ),
    ]
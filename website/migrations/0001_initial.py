# Generated by Django 3.0.5 on 2020-04-06 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(editable=False, max_length=50)),
                ('lname', models.CharField(editable=False, max_length=50)),
                ('email', models.EmailField(editable=False, max_length=254)),
                ('reason', models.CharField(choices=[('a', 'assistance'), ('i', 'information')], max_length=20)),
                ('message', models.TextField(max_length=500)),
            ],
        ),
    ]
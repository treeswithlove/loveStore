# Generated by Django 2.2.2 on 2019-06-17 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Shell',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=100)),
                ('image_url', models.CharField(default='', max_length=512)),
                ('description', models.TextField(default='', max_length=1000)),
                ('price', models.DecimalField(decimal_places=2, default='00.00', max_digits=4)),
                ('sku', models.CharField(default='', max_length=50)),
                ('quantity', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(default='', max_length=30)),
                ('last_name', models.CharField(default='', max_length=30)),
                ('email', models.EmailField(default='', max_length=50)),
                ('address_line1', models.CharField(default='', max_length=50)),
                ('city', models.CharField(default='', max_length=50)),
                ('state', models.CharField(default='', max_length=50)),
                ('country', models.CharField(default='', max_length=50)),
                ('postal_code', models.DecimalField(decimal_places=0, default='', max_digits=5)),
            ],
        ),
    ]

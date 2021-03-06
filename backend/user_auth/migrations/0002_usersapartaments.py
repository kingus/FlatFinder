# Generated by Django 2.2.15 on 2020-08-23 20:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UsersApartaments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_favourite', models.BooleanField(default=False)),
                ('apartament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_auth.Apartament')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

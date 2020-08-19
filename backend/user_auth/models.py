from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User, AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, password):
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=200, unique=True)
    email = models.CharField(max_length=200, unique=True, null=False)
    is_active = models.BooleanField(default=True, null=False)
    is_staff = models.BooleanField(default=False, null=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

class Apartament(models.Model):
    apartament_id = models.TextField(default="")
    place = models.TextField(default="")
    description = models.TextField(default="")
    price = models.FloatField(default=0.0)
    area = models.FloatField(default=0.0)
    price_per_m = models.FloatField(default=0.0)
    rooms = models.TextField(default="")
    offer_url = models.TextField(default="")
    source = models.TextField(default="")
    start_dttm = models.DateTimeField(
        default=timezone.now)
    end_dttm = models.DateTimeField(default=timezone.now)

    def add_apartament(self):
        self.start_dttm = timezone.now()
        self.save()

    def __str__(self):
        return self.apartament_id
from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.utils.translation import gettext_lazy as _
import jwt


class MyUserManager(UserManager):

    def _create_user(self, first_name='', last_name='', username='', email='', password='', password2='',
                     phone_number='', avatar='', **extra_fields):
        """
        Create a user with the given credentials
        """
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(first_name=first_name, last_name=last_name, username=username, email=email,
                          password=password, password2=password2, phone_number=phone_number, avatar=avatar)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, first_name='', last_name='', username='', email='', password='', password2='',
                    phone_number='', avatar='', **extra_fields):
        user = self._create_user(first_name, last_name, username, email, password, password2, phone_number, avatar,
                                 **extra_fields)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name='', last_name='', username='', email='', password='', password2='',
                         phone_number='', avatar='', **extra_fields):
        user = self._create_user(first_name, last_name, username, email, password, password2,
                                 phone_number, avatar, **extra_fields)

        # give superuser access to admin panel
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """
    A custom user model

    Resource used for this file:
    - https://docs.djangoproject.com/en/dev/topics/auth/customizing/
    - https://pypi.org/project/PyJWT/
    - https://django.fun/en/qa/1027/
    """
    first_name = models.CharField(_('first_name'), blank=True, default='', max_length=50)
    last_name = models.CharField(_('last_name'), blank=True, default='', max_length=50)
    username = models.CharField(_('username'), blank=False, max_length=50, unique=True,
                                validators=[ASCIIUsernameValidator()])
    email = models.EmailField(_('email'), blank=False, unique=True)
    password = models.CharField(_("password"), blank=False, max_length=50)
    password2 = models.CharField(_("password2"), default='', blank=False, max_length=50)
    phone_number = models.CharField(_("phone_number"), default='', max_length=20)
    # https://django.fun/en/qa/1027/
    avatar = models.ImageField(_("avatar"), upload_to='avatars/', default='')

    # fields necessary for admin access
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = MyUserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    PASSWORD_FIELD = 'password'

    REQUIRED_FIELDS = ['email', 'password', 'password2']

    # https://pypi.org/project/PyJWT/
    @property
    def auth_token(self):
        return jwt.encode(
            {'username': self.username},
            "secret", algorithm="HS256")

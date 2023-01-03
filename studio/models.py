# from django.contrib.gis.db.models import PointField
from django.core.validators import MaxValueValidator, MinValueValidator, \
    RegexValidator
from django.db import models
from django.contrib import admin

# Create your models here.
from django.db.models import CASCADE, DecimalField, ForeignKey, ImageField, \
    ManyToManyField, OneToOneField, \
    SET_NULL




class Studio(models.Model):

    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    # for geographical location we want to store longitude and latitude values
    # geographical_location = models.ForeignKey(Location, on_delete=models.CASCADE)
    latitude = models.FloatField(
        validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitude = models.FloatField(
        validators=[MinValueValidator(-180), MaxValueValidator(180)])
    postal_code = models.CharField(max_length=200, validators=[
        RegexValidator(
            regex='^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}[0-9]{1}'
                  '[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}[ ]?[0-9]{1}'
                  '[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}[0-9]{1}$',
            message='Postal Code is invalid',
        ),
    ])
    phone_number = models.CharField(max_length=200)
    # need to write a regex
    # to validate the phone number
    # use add to add images, need to fix because doesn't allow to add
    # multiple files
    # images = models.ForeignKey(Image, )

    objects = models.Manager()
    
    def __str__(self):
        return f'{self.name}'




class Image(models.Model):

    image = models.FileField(upload_to='studio_images/', null=True, blank=True)
    studios = ForeignKey(to=Studio, related_name='images', on_delete=CASCADE)
    objects = models.Manager()

    def __str__(self):
        return f'{self.image.name}'


class Amenities(models.Model):
    type = models.CharField(max_length=200)
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    studios = ForeignKey(to=Studio, related_name='amenities', on_delete=CASCADE)
    objects = models.Manager()

    def __str__(self):
        return f'{self.type}'


class Location(models.Model):
    lat = models.FloatField(
        validators=[MinValueValidator(-90), MaxValueValidator(90)], null=False,
        blank=False)
    long = models.FloatField(
        validators=[MinValueValidator(-180), MaxValueValidator(180)],
        null=False, blank=False)


class PostalCode(models.Model):

    # write regex to validate postal code
    postal_code = models.CharField(max_length=200, null=False, blank=False)

from classes.models import Class
# have to migrate models
class StudioToDistance(models.Model):
    studio_id = models.CharField(max_length=200)
    distance_to_studio = models.FloatField()
    studio_name = models.CharField(max_length=200)
    studio_amenities = models.ManyToManyField(Amenities)
    studio_classes = models.ManyToManyField(Class)
    objects = models.Manager()


class GeoProx(models.Model):
    # studio's distance to user_id
    # bank_of_branch.branch.add(new_branch)
    # bank_of_branch.save()
    user_id = models.CharField(max_length=200, null=False, blank=False)
    studio_to_distance = models.ManyToManyField(StudioToDistance)
    current_lat = models.FloatField(
        validators=[MinValueValidator(-90), MaxValueValidator(90)], null=False,
        blank=False)
    current_long = models.FloatField(
        validators=[MinValueValidator(-90), MaxValueValidator(90)], null=False,
        blank=False)
    objects = models.Manager()


class ClickStudio(models.Model):
    studio_user_click_on = models.IntegerField(null=False,
        blank=False)

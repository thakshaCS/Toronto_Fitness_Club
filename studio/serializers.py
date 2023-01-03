from rest_framework import serializers

from classes.models import Class
from studio.models import Amenities, ClickStudio, Location, PostalCode, Studio, \
    StudioToDistance


class GeoProxStudioByPinPointSerializer(serializers.ModelSerializer):
    # in front end these will be separated
    # pin point will be from map
    class Meta:
        model = Location
        fields = ['lat', 'long']


class GeoProxStudioByCurrentLocationSerializer(serializers.ModelSerializer):
    # in front end these will be separated
    # current location may be by tracking
    class Meta:
        model = Location
        fields = ['lat', 'long']


class GeoProxStudioByPostalSerializer(serializers.ModelSerializer):
    # in front end these will be separated
    class Meta:
        model = PostalCode
        fields = ['postal_code']


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = (
            'name',
            'coach',
        )


class StudioSerializer(serializers.ModelSerializer):

    studio_amenities = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='type'
    )

    studio_classes = ClassSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = StudioToDistance
        fields = ['studio_id', 'studio_name', 'distance_to_studio',
                  'studio_amenities', 'studio_classes']


class StudioClickOnSerializer(serializers.ModelSerializer):
    # in front end these will be separated
    class Meta:
        model = ClickStudio
        fields = ['studio_user_click_on']

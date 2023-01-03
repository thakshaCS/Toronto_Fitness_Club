from rest_framework import serializers

from classes.models import Class


class CreateClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

        extra_kwargs = {
            'name': {'read_only': True},
            'description': {'read_only': True},
            'coach': {'read_only': True},
            'capacity': {'read_only': True},
            'space_available': {'read_only': True},
            'day': {'read_only': True},
            'start_time': {'read_only': True},
            'end_time': {'read_only': True},
            'start_date': {'read_only': True},
            'end_date': {'read_only': True},
            'studio': {'read_only': True},
            'is_enrolled': {'read_only': True},
            'is_cancelled': {'read_only': True},
            'length': {'read_only': True},
        }


class EnrolClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

        extra_kwargs = {
            'name': {'read_only': True},
            'description': {'read_only': True},
            'coach': {'read_only': True},
            'capacity': {'read_only': True},
            'space_available': {'read_only': True},
            'day': {'read_only': True},
            'start_time': {'read_only': True},
            'end_time': {'read_only': True},
            'start_date': {'read_only': True},
            'end_date': {'read_only': True},
            'studio': {'read_only': True},
            'is_cancelled': {'read_only': True},
            'length': {'read_only': True},        }

from rest_framework import serializers
from djoser.serializers import CurrentPasswordSerializer, UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import Apartament
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'password')

class ApartamentSerializer(serializers.Serializer):
    apartament_id = serializers.CharField(max_length=20)
    place = serializers.CharField()
    description = serializers.CharField()
    price = serializers.FloatField()
    area = serializers.FloatField()
    price_per_m = serializers.FloatField()
    rooms = serializers.CharField()
    offer_url = serializers.CharField()
    source = serializers.CharField()
    start_dttm = serializers.DateTimeField()
    end_dttm = serializers.DateTimeField()

    def create(self, validated_data):
        return Apartament.objects.create(**validated_data)
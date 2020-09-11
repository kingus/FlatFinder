from rest_framework import serializers
from djoser.serializers import CurrentPasswordSerializer, UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import Apartament, UserAccount, UsersApartaments
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'password')


class UserSerializer(serializers.Serializer):
    class Meta():
        model = UserAccount
        fields = ('id')


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


class UsersApartamentSerializer(serializers.Serializer):
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
    is_favourite = serializers.SerializerMethodField()  # add field

    def get_is_favourite(self, obj):
        # here write the logic to compute the value based on object
        # print(obj.apartament_id)

        is_favourites_dict = (self.context.get("is_favourite"))

        is_favourite = self.context.get("is_favourite")[obj.apartament_id]
        return is_favourite
        # return 2

    def create(self, validated_data):
        # is_favourite = self.context.get("is_favourite")
        return Apartament.objects.create(**validated_data)


# class UsersApartamentSerializer(serializers.Serializer):
#     class Meta:
#         model = UsersApartaments
#         fields = ('user', 'apartament', 'is_favourite', 'is_interested')

    # user = UserSerializer(many=False, read_only=True)
    # user_id = serializers.IntegerField(write_only=True)
    # apartament = serializers.PrimaryKeyRelatedField(
    #      read_only=False, queryset=Apartament.objects.all())
    # is_favourite = serializers.BooleanField()
    # is_interesting = serializers.BooleanField()

    #    class Meta:
    #         model = UsersApartaments
    #         fields = '__all__'

    #     def create(self, validated_data):
    #         return UsersApartaments.objects.create(**validated_data)

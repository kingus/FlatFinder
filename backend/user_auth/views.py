from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView, View
from .models import UserAccount, Apartament, UsersApartaments
from .serializers import UserCreateSerializer, ApartamentSerializer, UsersApartamentSerializer
from rest_framework.response import Response
from datetime import datetime
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


class UserView(APIView):
    def get(self, request):
        users = UserAccount.objects.all()
        serializer = UserCreateSerializer(users, many=True)

        return HttpResponse(serializer.data)


# @permission_classes((IsAuthenticated, ))
class ApartamentView(APIView):
    def get(self, request):

        apartament_id = request.GET.get('apartament_id')

        if apartament_id is None:
            apartaments = Apartament.objects.all()
        else:
            apartaments = Apartament.objects.filter(
                apartament_id=apartament_id)
        serializer = ApartamentSerializer(apartaments, many=True)

        return Response({"apartaments": serializer.data})

    def post(self, request):
        apartament = request.data.get('apartament')
        serializer = ApartamentSerializer(data=apartament)
        if serializer.is_valid(raise_exception=True):
            apartament_saved = serializer.save()
        return Response({"success": "Apartament '{}' created successfully".format(apartament_saved.apartament_id)})

    def put(self, request):
        apartaments = request.data.get('apartaments')
        apartaments_list = list()

        # deactivate all apartaments in db
        Apartament.objects.update(end_dttm=str(datetime.now()))

        for apartament in apartaments:
            print(apartament)
            serializer = ApartamentSerializer(data=apartament)
            apartament_db = len(Apartament.objects.filter(
                apartament_id=apartament['apartament_id']))
            print(apartament_db)

            # save new active apartaments
            if serializer.is_valid(raise_exception=True) and apartament_db == 0:
                apartament_saved = serializer.save()
                apartaments_list.append(apartament)

            # activate apartament that was passed in current request and exists in db
            elif serializer.is_valid(raise_exception=True) and apartament_db > 0:
                apart = Apartament.objects.filter(apartament_id=apartament['apartament_id']).update(
                    end_dttm="2030-12-31 23:59:59.9999")
        return Response({"new_apartaments_list": apartaments_list})

    def delete(self, request, apartament_id):
        Apartament.objects.filter(apartament_id=apartament_id).delete()
        return Response({"success": "Apartament '{}' has been removed successfully".format(apartament_id)})


class UsersApartamentsView(APIView):

    def post(self, request):
        username = request.GET.get('user', '')

        # users_apartament = request.data
        # ap_id = users_apartament['apartament']
        # user = users_apartament['user']
        # print("SSSSSSSS", user)
        # is_favourite = users_apartament['is_favourite']
        # is_interesting = users_apartament['is_interesting']
        # apartament = Apartament.objects.get(apartament_id=ap_id)
        user_object = UserAccount.objects.get(username=username)
        print(user_object)
        apartaments = UsersApartaments.objects.filter(
            user=user_object).values('apartament')

        id_list = list()
        for i in apartaments:
            id_list.append(i['apartament'])
        print(id_list)
        all_apartaments = Apartament.objects.all()
        print(all_apartaments)
        is_interesting = True
        is_favourite = False

        for apartament in all_apartaments:
            if apartament.apartament_id not in id_list:

                saved_apartament = UsersApartaments(user=user_object, apartament=apartament,
                                                    is_favourite=is_favourite, is_interesting=is_interesting)
                saved_apartament.save(apartament)

        return Response({"success": "Apartament '{}' created successfully".format("SSS")})

    def get(self, request):
        data = request.data
        users = UserAccount.objects.all()
        username = request.GET.get('user', '')

        user = UserAccount.objects.get(username=username)
        print(username)
        print("CHECK")
        apartaments = UsersApartaments.objects.filter(
            user=user).values('apartament')

        id_list = list()
        for i in apartaments:
            id_list.append(i['apartament'])
        apartament = Apartament.objects.filter(apartament_id__in=id_list)
        serializer = ApartamentSerializer(apartament, many=True)
        return Response({"apartaments": serializer.data})

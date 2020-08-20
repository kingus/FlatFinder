from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView, View
from .models import UserAccount, Apartament
from .serializers import UserCreateSerializer, ApartamentSerializer
from rest_framework.response import Response
from datetime import datetime


class UserView(APIView):
    def get(self, request):
        users = UserAccount.objects.all()
        serializer = UserCreateSerializer(users, many=True)

        return HttpResponse(serializer.data)


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

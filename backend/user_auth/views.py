from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView, View
from .models import UserAccount
from .serializers import UserCreateSerializer

class UserView(APIView):
    def get(self, request):
        users = UserAccount.objects.all()
        serializer = UserCreateSerializer(users, many=True)

        return HttpResponse(serializer.data)
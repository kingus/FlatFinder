from django.contrib import admin
from django.urls import path, include, re_path
from user_auth.views import ApartamentView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('apartament', ApartamentView.as_view()),
]

from django.contrib import admin
from django.urls import path, include, re_path
from user_auth.views import ApartamentView, UsersApartamentsView, UserView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('apartament', ApartamentView.as_view()),
    path('users-apartaments', UsersApartamentsView.as_view()),
    path('users', UserView.as_view()),
]

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from user_auth.views import UserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('user', UserView.as_view(), name='user'),

]

urlpatterns +=[re_path(r'^.*', TemplateView.as_view(template_name="index.html"))]

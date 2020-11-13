from django.urls import path
from rest_framework.authtoken import views as authtoken_views
from .views.Leagues import Leagues

urlpatterns = [
  path('login', authtoken_views.obtain_auth_token),
  path('leagues', Leagues.as_view()),
]

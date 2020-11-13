from django.urls import path
from rest_framework.authtoken import views as authtoken_views

urlpatterns = [
  path('login', authtoken_views.obtain_auth_token),
]

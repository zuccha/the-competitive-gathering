from django.urls import path
from .views.auth import login

urlpatterns = [
  path('login', login, name='login'),
]

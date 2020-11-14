from django.urls import path, re_path
from rest_framework.authtoken import views as authtoken_views
from .views.Leagues import Leagues
from .views.Matches import Matches
from .views.Standings import Standings

urlpatterns = [
  path('login', authtoken_views.obtain_auth_token),
  path('leagues', Leagues.as_view()),
  re_path(r'^matches/(?P<id>\d*$)', Matches.as_view()),
  path('standings', Standings.as_view()),
]

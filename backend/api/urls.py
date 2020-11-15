from django.urls import path, re_path
from rest_framework.authtoken import views as authtoken_views
from .views.League import League
from .views.LeaguePlayer import LeaguePlayer
from .views.LeagueStatus import LeagueStatus
from .views.Leagues import Leagues
from .views.Match import Match
from .views.Matches import Matches
from .views.Standings import Standings

urlpatterns = [
  path('login', authtoken_views.obtain_auth_token),

  re_path(r'^leagues/(?P<id>\d+)/players/(?P<username>\w+)$', LeaguePlayer.as_view()),
  re_path(r'^leagues/(?P<id>\d+)/status$', LeagueStatus.as_view()),
  re_path(r'^leagues/(?P<id>\d+)$', League.as_view()),
  path('leagues/', Leagues.as_view()),

  re_path(r'^matches/(?P<id>\d+)$', Match.as_view()),
  path('matches/', Matches.as_view()),

  path('standings/', Standings.as_view()),
]

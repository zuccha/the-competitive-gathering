from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from ..models.League import League
from ..models.Match import Match
from ..utils.Standing import Standing

class Standings(APIView):
  def get(self, request):
    users = User.objects.all()
    matches = Match.objects.all()
    standings = []
    for user in users.iterator():
      userMatches = matches.filter(Q(player1=user) | Q(player2=user)).all()
      standing = Standing(0, 0, 0, 0, 0, 0, 0, 0, 0)
      for userMatch in userMatches.iterator():
        standing.add(userMatch.get_standing_for(user.username))
      standings.append({
        "username": user.username,
        "points": standing.points,
        "matches_played": standing.matches_played,
        "matches_won": standing.matches_won,
        "matches_lost": standing.matches_lost,
        "matches_drew": standing.matches_drew,
        "games_played": standing.games_played,
        "games_won": standing.games_won,
        "games_lost": standing.games_lost,
        "games_drew": standing.games_drew,
      })

    return JsonResponse(standings, safe=False)

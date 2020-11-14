from django.contrib.auth.models import User
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.views import APIView
from ..models.League import League
from ..models.Match import Match
from ..utils.Standing import Standing
from ..utils.parse_id import parse_id

class Standings(APIView):
  def get(self, request):
    league_id = parse_id(request.GET.get('league_id', None))
    player = request.GET.get('player', None)

    users = User.objects
    if league_id != None:
      league = League.objects.filter(id=league_id).first()
      if league != None:
        usernames = map(lambda player: player.username, league.players.all())
        users = users.filter(username__in=usernames)
    if player != None:
      users = users.filter(username=player)
    users = users.all()

    matches = Match.objects
    if league_id != None:
      matches = matches.filter(league__id=league_id)
    if player != None:
      matches = matches.filter(Q(player1__username=player) | Q(player2__username=player))
    matches = matches.filter(Q(player1__in=users) | Q(player2__in=users)).all()

    standings = []
    for user in users:
      userMatches = matches.filter(Q(player1=user) | Q(player2=user)).all()
      standing = Standing(0, 0, 0, 0, 0, 0, 0, 0, 0)
      for userMatch in userMatches:
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

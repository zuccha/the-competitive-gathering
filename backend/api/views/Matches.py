from django.db.models import Q
from django.http import JsonResponse
from rest_framework.views import APIView
from ..models.Match import Match as MatchModel
from ..utils.parse_id import parse_id

class Matches(APIView):
  def get(self, request):
    matches = MatchModel.objects

    league_id = parse_id(request.GET.get('league_id', None))
    if league_id != None:
      matches = matches.filter(league__id=league_id)

    player = request.GET.get('player', None)
    if player != None:
      matches = matches.filter(Q(player1__username=player) | Q(player2__username=player))

    matches = matches.all()

    return JsonResponse(list(map(MatchModel.to_json, matches)), safe=False)

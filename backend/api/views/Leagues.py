from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from ..models.League import League

class Leagues(APIView):
  def get(self, request):
    leagues = League.objects.all()
    return JsonResponse(list(map(lambda league: {
      "id": league.id,
      "creator": league.creator.username,
      "players": list(map(lambda player: player.username, league.players.all())),
      "status": league.status,
      "format": league.format,
      "date_start": league.date_start,
      "date_end": league.date_end,
      "players_min": league.players_min,
      "players_max": league.players_max,
      "rounds": league.rounds,
    }, leagues)), safe=False)

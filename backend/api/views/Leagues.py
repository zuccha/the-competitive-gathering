from django.http import JsonResponse
from rest_framework.views import APIView
from ..models.League import League

class Leagues(APIView):
  def get(self, request, id):
    if id != '':
      league = League.objects.filter(id=id).first()
      return JsonResponse(league.to_json(), safe=False)

    leagues = League.objects

    player = request.GET.get('player', None)
    if player != None:
      leagues = leagues.filter(players__username__in=[player])

    leagues = leagues.all()
    return JsonResponse(list(map(League.to_json, leagues)), safe=False)

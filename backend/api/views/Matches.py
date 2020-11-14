from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from ..models.League import League
from ..models.Match import Match

class Matches(APIView):
  def get(self, request, league_id):
    if league_id == '':
      matches = Match.objects.all()
      return JsonResponse(list(map(Match.to_json, matches)), safe=False)

    matches = Match.objects.filter(league__id=league_id).all()
    return JsonResponse(list(map(Match.to_json, matches)), safe=False)

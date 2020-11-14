from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from ..models.League import League

class Leagues(APIView):
  def get(self, request):
    leagues = League.objects.all()
    return JsonResponse(list(map(League.to_json, leagues)), safe=False)

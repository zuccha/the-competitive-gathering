import json
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
from rest_framework.views import APIView
from ..models.League import League as LeagueModel

class League(APIView):
  def get(self, request, id):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    league = LeagueModel.objects.filter(id=id).first()
    if league == None:
      return HttpResponseNotFound()

    return JsonResponse(league.to_json(), safe=False)

  def delete(self, request, id):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    league = LeagueModel.objects.filter(id=id).first()

    if league == None:
      return HttpResponseNotFound('league not found')

    if league.status != LeagueModel.Status.PENDING:
      return HttpResponseBadRequest('cannot cancel a league that is not pending')

    league.delete()
    return HttpResponse()

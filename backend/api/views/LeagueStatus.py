import json
from datetime import date
from django.http import HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
from rest_framework.views import APIView
from ..models.League import League as LeagueModel

class LeagueStatus(APIView):
  def put(self, request, id):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    if request.data == None or request.data.get('status') == None:
      return HttpResponseBadRequest('required field `status` is missing')

    status = request.data.get('status')
    league = LeagueModel.objects.filter(id=id).first()

    if league == None:
      return HttpResponseNotFound('league not found')

    if league.status == LeagueModel.Status.PENDING and status == LeagueModel.Status.ONGOING:
      if league.players.count() < league.players_min:
        return HttpResponseBadRequest('cannot start a league if the minimum number of players is not met')

      if league.players_max != None and league.players.count() > league.players_max:
        return HttpResponseBadRequest('cannot start a league if the number of registered players exceedes the maximum')

      # TODO: generate matches.

      league.status = LeagueModel.Status.ONGOING
      league.date_start = date.today()
      league.save()

      return JsonResponse(league.to_json())

    if league.status == LeagueModel.Status.ONGOING and status == LeagueModel.Status.CANCELED:
      league.status = LeagueModel.Status.CANCELED
      league.save()
      return JsonResponse(league.to_json())

    if league.status == LeagueModel.Status.ONGOING and status == LeagueModel.Status.DONE:
      # TODO: check that all matches are resolved.
      league.status = LeagueModel.Status.DONE
      league.date_end = date.today()
      league.save()
      return JsonResponse(league.to_json())

    return HttpResponseBadRequest('league cannot transition from `' + league.status + '` to `' + status + '`')

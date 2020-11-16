import json
from django.http import HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
from rest_framework.views import APIView
from ..models.League import League as LeagueModel
from ..models.Match import Match as MatchModel

def generate_matches(league):
  players = league.players.all()
  for round in range(league.rounds):
    for i in range(0, len(players)):
      for j in range(i + 1, len(players)):
        player1, player2 = (players[i], players[j]) if round % 2 == 0 else (players[j], players[i])
        match = MatchModel()
        match.league = league
        match.player1 = player1
        match.player2 = player2
        match.round = round
        match.save()

def is_league_ready(league):
  matches = MatchModel.objects.filter(league=league).all()
  return all(match.status == MatchModel.Status.DONE for match in matches)

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

      league.start()
      generate_matches(league)

      return JsonResponse(league.to_json())

    if league.status == LeagueModel.Status.ONGOING and status == LeagueModel.Status.CANCELED:
      league.cancel()
      return JsonResponse(league.to_json())

    if league.status == LeagueModel.Status.ONGOING and status == LeagueModel.Status.DONE:
      if not is_league_ready(league):
        return HttpResponseBadRequest('cannot end a league if there still are matches to play')

      league.done()
      return JsonResponse(league.to_json())

    return HttpResponseBadRequest('league cannot transition from `' + league.status + '` to `' + status + '`')

from django.contrib.auth.models import User as UserModel
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
        match.save()

def is_league_ready(league):
  matches = MatchModel.objects.filter(league=league).all()
  return all(match.status == MatchModel.Status.DONE for match in matches)

class LeaguePlayer(APIView):
  def put(self, request, id, username):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    if username == '':
      return HttpResponseBadRequest('required parameter `username` is missing')

    league = LeagueModel.objects.filter(id=id).first()
    if league == None:
      return HttpResponseNotFound('league not found')

    player = UserModel.objects.filter(username=username).first()
    if player == None:
      return HttpResponseNotFound('player not found')

    if league.players.filter(username=username).first() != None:
      return HttpResponseBadRequest('player is already enrolled')

    if len(league.players.all()) + 1 > league.players_max:
      return HttpResponseBadRequest('the maximum amount of players already enrolled in this league')

    league.players.add(player)

    return JsonResponse(league.to_json())

  def delete(self, request, id, username):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    if username == '':
      return HttpResponseBadRequest('required parameter `username` is missing')

    league = LeagueModel.objects.filter(id=id).first()
    if league == None:
      return HttpResponseNotFound('league not found')

    player = UserModel.objects.filter(username=username).first()
    if player == None:
      return HttpResponseNotFound('player not found')

    if league.players.filter(username=username).first() == None:
      return HttpResponseBadRequest('player is already not enrolled')

    league.players.remove(player)

    return JsonResponse(league.to_json())

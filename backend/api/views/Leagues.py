import json
from django.contrib.auth.models import User
from django.http import HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
from rest_framework.views import APIView
from ..models.League import League

def validate_league_input(league_input):
  if league_input == None:
    return 'body is missing'
  if league_input.get('creator') == None:
    return 'required field `creator` is missing'
  if league_input.get('players') == None:
    return 'required field `players` is missing'
  if league_input.get('format') == None:
    return 'required field `format` is missing'
  if league_input.get('players_min') == None:
    return 'required field `players_min` is missing'
  if league_input.get('rounds') == None:
    return 'required field `rounds` is missing'
  return None


class Leagues(APIView):
  def get(self, request, id):
    if id != '':
      league = League.objects.filter(id=id).first()
      if league == None:
        return HttpResponseNotFound()
      return JsonResponse(league.to_json(), safe=False)

    leagues = League.objects

    player = request.GET.get('player', None)
    if player != None:
      leagues = leagues.filter(players__username__in=[player])

    leagues = leagues.all()
    return JsonResponse(list(map(League.to_json, leagues)), safe=False)

  def post(self, request, id):
    league_input = request.data

    if id != '':
      return HttpResponseBadRequest('no need to provide an `id`')

    validation_error = validate_league_input(league_input)
    if validation_error != None:
      return HttpResponseBadRequest(validation_error)

    creator = User.objects.filter(username=league_input.get('creator')).first()
    if creator == None:
      return HttpResponseBadRequest('given `creator` is not a valid user')

    players = User.objects.filter(username__in=league_input.get('players')).all()

    league = League()
    league.creator = creator
    league.status=League.Status.PENDING
    league.format=league_input.get('format')
    league.players_min=league_input.get('players_min')
    league.players_max=league_input.get('players_max')
    league.rounds=league_input.get('rounds')
    league.save()
    league.players.set(players)

    return JsonResponse(league.to_json())

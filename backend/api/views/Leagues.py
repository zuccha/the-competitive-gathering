import json
from datetime import date
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
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

  def put(self, request, id):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    if request.data == None or request.data.get('status') == None:
      return HttpResponseBadRequest('required field `status` is missing')

    status = request.data.get('status')
    league = League.objects.filter(id=id).first()

    if league == None:
      return HttpResponseNotFound('league not found')

    if league.status == League.Status.PENDING and status == League.Status.ONGOING:
      if league.players.count() < league.players_min:
        return HttpResponseBadRequest('cannot start a league if the minimum number of players is not met')

      if league.players_max != None and league.players.count() > league.players_max:
        return HttpResponseBadRequest('cannot start a league if the number of registered players exceedes the maximum')

      # TODO: generate matches.

      league.status = League.Status.ONGOING
      league.date_start = date.today()
      league.save()

      return JsonResponse(league.to_json())

    if league.status == League.Status.ONGOING and status == League.Status.CANCELED:
      league.status = League.Status.CANCELED
      league.save()
      return JsonResponse(league.to_json())

    if league.status == League.Status.ONGOING and status == League.Status.DONE:
      # TODO: check that all matches are resolved.
      league.status = League.Status.DONE
      league.date_end = date.today()
      league.save()
      return JsonResponse(league.to_json())

    return HttpResponseBadRequest('league cannot transition from `' + league.status + '` to `' + status + '`')


  def delete(self, request, id):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    league = League.objects.filter(id=id).first()

    if league == None:
      return HttpResponseNotFound('league not found')

    if league.status != League.Status.PENDING:
      return HttpResponseBadRequest('cannot cancel a league that is not pending')

    league.delete()
    return HttpResponse()

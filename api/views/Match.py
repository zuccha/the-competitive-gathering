from django.http import HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
from rest_framework.views import APIView
from ..models.League import League as LeagueModel
from ..models.Match import Match as MatchModel

def validate_match_input(match_input):
  if match_input == None:
    return 'body is missing'
  if match_input.get('status') == None:
    return 'required field `status` is missing'
  if match_input.get('games_won_by_player1') == None:
    return 'required field `games_won_by_player1` is missing'
  if match_input.get('games_won_by_player2') == None:
    return 'required field `games_won_by_player2` is missing'
  if match_input.get('games_drew') == None:
    return 'required field `games_drew` is missing'
  return None

class Match(APIView):
  def get(self, request, id):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    match = MatchModel.objects.filter(id=id).first()

    if match == None:
      return HttpResponseNotFound()

    return JsonResponse(match.to_json(), safe=False)

  def put(self, request, id):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    match_input = request.data
    validation_error = validate_match_input(match_input)
    if validation_error != None:
      return HttpResponseBadRequest(validation_error)

    match = MatchModel.objects.filter(id=id).first()
    if match == None:
      return HttpResponseNotFound('match not found')

    if match.league.status != LeagueModel.Status.ONGOING:
      return HttpResponseBadRequest('cannot update a match for a league that is not ongoing')

    status = match_input.get('status')
    if match.status == MatchModel.Status.PENDING and status == MatchModel.Status.DONE:
      match.status = MatchModel.Status.DONE
      match.games_won_by_player1 = match_input.get('games_won_by_player1')
      match.games_won_by_player2 = match_input.get('games_won_by_player2')
      match.games_drew = match_input.get('games_drew')
      match.save()
      return JsonResponse(match.to_json(), safe=False)

    return HttpResponseBadRequest('league cannot transition from `' + match.status + '` to `' + status + '`')

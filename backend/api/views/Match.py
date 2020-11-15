from django.http import HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
from rest_framework.views import APIView
from ..models.Match import Match as MatchModel

class Match(APIView):
  def get(self, request, id):
    if id == '':
      return HttpResponseBadRequest('required parameter `id` is missing')

    match = MatchModel.objects.filter(id=id).first()

    if match == None:
      return HttpResponseNotFound()

    return JsonResponse(match.to_json(), safe=False)

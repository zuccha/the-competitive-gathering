import json
from django.contrib.auth import authenticate #, login
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
# from django.views.decorators.http import require_http_methods
from ..utils.require_http_methods import require_http_methods

class HttpResponseUnauthorized(HttpResponse):
  status_code = 401

@require_http_methods(["POST"])
def login(request):
  body = json.loads(request.body)
  username = body['username']
  password = body['password']
  user = authenticate(request, username=username, password=password)
  if user is not None:
      return JsonResponse({ 'token': 'ok' })
  else:
      return HttpResponseUnauthorized()

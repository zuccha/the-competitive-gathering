import json
from django.contrib.auth.models import User as UserModel
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
from rest_framework.views import APIView
from ..models.League import League as LeagueModel

class UserPassword(APIView):
  def put(self, request, username):
    if username == '':
      return HttpResponseBadRequest('required parameter `username` is missing')

    if request.data == None:
      return HttpResponseBadRequest('required data is missing')

    password_old = request.data.get('password_old')
    if password_old == None:
      return HttpResponseBadRequest('required field `password_old` is missing')

    password_new = request.data.get('password_new')
    if password_new == None:
      return HttpResponseBadRequest('required field `password_new` is missing')

    user = UserModel.objects.filter(username=username).first()
    if user == None:
      return HttpResponseNotFound('user not found')

    if not user.check_password(password_old):
      return HttpResponseBadRequest('old password must match current passoword')

    user.set_password(password_new)
    user.save()

    return HttpResponse()

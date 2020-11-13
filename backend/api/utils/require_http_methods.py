from functools import wraps
from django.http import HttpResponse, HttpResponseNotAllowed
from django.utils.log import log_response

def require_http_methods(request_method_list):
  """
  Decorator to make a view only accept particular request methods.

  This decorator always accepts OPTIONS, and returns a 204 in case the header is
  provided. If OPTIONS is present in the given method list, then the default
  OPTIONS response will be ignored and the user must implement it himself.

  Usage::

    @require_http_methods(["GET", "POST"])
    def my_view(request):
      # I can assume now that only GET or POST requests make it this far
      # ...

  Note that request methods should be in uppercase.
  """
  def decorator(func):
    @wraps(func)
    def inner(request, *args, **kwargs):
      if request.method == 'OPTIONS' and 'OPTIONS' not in request_method_list:
        response = HttpResponse()
        response.status_code = 204
        response['Allow'] = ', '.join(['OPTIONS'] + request_method_list)
        return response

      if request.method not in request_method_list:
        response = HttpResponseNotAllowed(request_method_list)
        log_response(
          'Method Not Allowed (%s): %s', request.method, request.path,
          response=response,
          request=request,
        )
        return response
      return func(request, *args, **kwargs)
    return inner
  return decorator

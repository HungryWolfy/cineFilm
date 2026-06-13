from os import access
from tokenize import TokenError

from rest_framework import validators
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):
  def authenticate(self, request):
    # Получаем токен
    access_token = request.COOKIES.get('access_token')

    if not access_token:
      return None

    try:
      validated_token = self.get_validated_token(access_token)
      user = self.get_user(validated_token)

      return user, validated_token

    except TokenError:
      return None

    except Exception:
      return None

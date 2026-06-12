from os import access
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):
  def authenticate(self, request):
    print(request.COOKIES)
    # Получаем токен
    access_token = request.COOKIES.get('access_token')

    if not access_token:
      return None

    # Валидация токена
    validated_token = self.get_validated_token(access_token)
    # Получаем пользователя из БД
    return self.get_user(validated_token), validated_token

from django.urls import path
from .views import (
  register_api,
  login_api,
  logout_api,
  refresh_api,
  me,
  ping,
  csrf,
)

urlpatterns = [
  path('register/', register_api, name='api_register'),
  path('login/', login_api),
  path('logout/', logout_api),
  path('refresh/', refresh_api),
  path('me/', me),
  path('ping/', ping, name='api_ping'),
  path('csrf/', csrf, name='api_csrf')
]

from django.urls import path
from .views import (
  register_api,
  login_api,
  logout_api,
  refresh_api,
  me,
  ping,
  csrf,
  update_avatar,
)

urlpatterns = [
  path('register/', register_api, name='api_register'),
  path('login/', login_api, name='api_login'),
  path('logout/', logout_api, name='api_logout'),
  path('refresh/', refresh_api, name='api_refresh'),
  path('me/', me, name='api_me'),
  path('profile/avatar/', update_avatar, name='api_update_avatar'),
  path('ping/', ping, name='api_ping'),
  path('csrf/', csrf, name='api_csrf'),
]
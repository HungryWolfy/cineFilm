from django.urls import path
from .views import register_api

urlpatterns = [
    path('register/', register_api, name='api_register'),
]

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()


class LoginSerializer(serializers.Serializer):
  login = serializers.CharField(
    required=True,
    allow_blank=False,
    trim_whitespace=True,
    max_length=150
  )

  password = serializers.CharField(
    required=True,
    allow_blank=False,
    trim_whitespace=True,
    max_length=256
  )


class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = ('avatar',)


class MeSerializer(serializers.ModelSerializer):
  profile = ProfileSerializer(read_only=True)

  class Meta:
    model = User
    fields = (
      'id',
      'username',
      'email',
      'profile'
    )

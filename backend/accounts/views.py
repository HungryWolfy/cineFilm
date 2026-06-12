from django.contrib.auth import authenticate
from rest_framework import response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
  LoginSerializer,
  MeSerializer
)
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(['POST'])
def register_api(request):
  data = request.data

  login = data.get('login', '').strip()
  email = data.get('email', '').lower().strip()
  password = data.get('password', '').strip()

  if not login or not email or not password:
    return Response(
      {
        'success': False,
        'error': 'Incorrectly entered data'
      },
      status=400
    )

  if User.objects.filter(email=email).exists():
    return Response(
      {
        'success': False,
        'error': 'This email address is already registered',
      },
      status=400
    )

  if User.objects.filter(username=login).exists():
    return Response(
      {
        'success': False,
        'error': 'This username is already taken'
      }
    )

  user = User.objects.create_user(
    username=login,
    email=email,
    password=password
  )

  try:
    send_mail(
      subject='Welcome',
      message='Thank you for registering for cineFilm',
      from_email=settings.DEFAULT_FROM_EMAIL,
      recipient_list=[email],
      fail_silently=False,
    )
  except Exception as e:
    print('Mail send error', e)

  return Response(
    {
      'success': True,
      'message': 'Registration was successful.'
    }
  )


@api_view(['POST'])
def login_api(request):
  serializer = LoginSerializer(data=request.data)

  if not serializer.is_valid():
    return Response(
      {
        'success': False,
        'errors': serializer.errors
      },
      status=400
    )

  login = serializer.validated_data['login']
  password = serializer.validated_data['password']

  user = authenticate(
    username=login,
    password=password
  )

  if user is None:
    return Response(
      {
        'success': False,
        'error': 'Invalid login or password'
      },
      status=401
    )

  refresh = RefreshToken.for_user(user)

  response = Response(
    {
      'success': True,
    }
  )

  response.set_cookie(
    key='access_token',
    value=str(refresh.access_token),
    httponly=True,
  )

  response.set_cookie(
    key='refresh_token',
    value=str(refresh),
    httponly=True,
  )

  return response

@api_view(['POST'])
def logout_api(request):
  response = Response ({
    'success': True,
  })

  response.delete_cookie(
    key='access_token',
  )

  response.delete_cookie(
    key='refresh_token',
  )

  return response



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
  serializer = MeSerializer(request.user)
  return Response(serializer.data)


@api_view(['GET'])
def ping(request):
  return Response({'ok': True})


@ensure_csrf_cookie
@api_view(['GET'])
def csrf(request):
  return Response({"detail": "CSRF cookie set"})

from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json


@csrf_exempt
def register_api(request):
  if request.method == 'POST':
    try:
      data = json.loads(request.body)
    except Exception:
      return JsonResponse({'success': False, 'error': 'Incorrect JSON'}, status=400)

    login = data.get('login', '').strip()
    email = data.get('email', '').lower().strip()
    password = data.get('password', '').strip()

    if not login or not email or not password:
      return JsonResponse({'success': False, 'error': 'Incorrectly entered data'}, status=400)

    if User.objects.filter(email=email).exists():
      return JsonResponse({'success': False, 'error': 'This email address is already registered'}, status=400)

    user = User.objects.create_user(username=login, email=email, password=password)

    try:
      send_mail(
        subject='Welcome',
        message='Thank you for registering for cineFilm',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        fail_silently=False
      )
    except Exception as e:
      print('Mail send error:', e
            )

    return JsonResponse({'success': True, 'message': 'Registration was successful.'})

  return JsonResponse({'success': False, 'error': 'Только POST метод'}, status=405)

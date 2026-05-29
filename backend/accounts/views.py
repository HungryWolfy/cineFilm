from django.conf.global_settings import DEFAULT_FROM_EMAIL
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.mail import send_mail
import json


@csrf_exempt
def register_api(request):
    if request.method == 'POST':
        print('BODY:', request.body)
        try:
            data = json.loads(request.body)
        except Exception as e:
            print('JSON decode error:', e)
            return JsonResponse({'success': False, 'error': 'Incorrect JSON'},
                                status=400)

        email = data.get('email', '').lower().strip()
        password = data.get('password', '').strip()
        print('EMAIL:', email)
        print('PASSWORD:', password)

        if not email or not password:
            print('Validation error: missing email or password')
            return JsonResponse(
                {'success': False, 'error': 'Email and password required'},
                status=400)

        if User.objects.filter(email=email).exists():
            print('Validation error: user already exists')
            return JsonResponse({'success': False,
                                 'error': 'This email address is already registered'},
                                status=400)

        try:
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password
            )
            print('User created:', user)
        except Exception as e:
            print('User creation error:', e)
            return JsonResponse(
                {'success': False, 'error': f'User create error: {e}'},
                status=400)

        try:
            send_mail(
                subject='Welcome!',
                message='Thank you for registering for cineFilm',
                from_email=DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False
            )
            print('Email send attempted')
        except Exception as e:
            print('Send mail error:', e)
            return JsonResponse(
                {'success': False, 'error': f'Mail send error: {e}'},
                status=400)

        print('Success, returning 200')
        return JsonResponse({'success': True,
                             'message': 'Registration was successful. Check your email.'})
    return JsonResponse({'success': False, 'error': 'Только POST метод'},
                        status=405)

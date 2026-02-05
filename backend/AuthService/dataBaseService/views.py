# views.py
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import User
import jwt
from datetime import datetime, timedelta

def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        return JsonResponse({
            "id": user.id,
            "email": user.email,
            "name": user.name,
        })
    except User.DoesNotExist:
        return JsonResponse({"error": "Not Found"}, status=404)

@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def user_register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print("Received ", data)
        
        try:
            # ВМЕСТО User.objects.create_user - создаем вручную
            user = User()
            user.email = data['email']
            user.name = data['name']
            user.phone = data.get('phone', '')
            user.role = data.get('role', '')
            user.set_password(data['password'])  # ← критически важно!
            user.save()
            
            return JsonResponse({'id': user.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': "Только POST"}, status=405)

@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(request, email=email, password=password)
        if user:
            # Обновляем last_login
            user.last_login = datetime.utcnow()
            user.save(update_fields=['last_login'])
            
            payload = {
                'user_id': user.id,
                'email': user.email,
                'exp': datetime.utcnow() + timedelta(days=7)
            }
            token = jwt.encode(payload, 'SECRET_KEY', algorithm='HS256')
            
            return JsonResponse({
                'token': token,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': user.name
                }
            })
        else:
            return JsonResponse({'error': "Неверные данные"}, status=401)
    return JsonResponse({'error': "Только POST"}, status=405)

# views.py
@csrf_exempt
@require_http_methods(["GET", "OPTIONS"])
def get_current_user(request):
    if request.method == 'GET':
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            try:
                payload = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])
                user = User.objects.get(id=payload['user_id'])
                return JsonResponse({
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'name': user.name,
                        'role': user.role or 'загадывающий'
                    }
                })
            except Exception as e:
                print(f"JWT decode error: {e}")
                pass
        return JsonResponse({'user': None})
    return JsonResponse({'error': 'Method not allowed'}, status=405)
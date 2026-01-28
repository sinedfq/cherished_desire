import json
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from .models import User
# Create your views here.

def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        return JsonResponse({
            "id": user.id,
            "email": user.email,
            "name": user.name,
        })
    except User.DoesNotExist:
        return JsonResponse({"error": "Not Found"}, status = 404)

@csrf_exempt    
def user_register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            user = User.objects.create_user(
                email = data['email'],
                password = data['password'],
                name = data['name'],
                phone = data.get('phone', ''),
                role = data.get('role', '')
            )
            return JsonResponse({'id': user.id}, status = 200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status = 400)
    return JsonResponse({'error': "Только POST"}, status = 405)

@csrf_exempt       
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(request, email = email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Успешный вход', 'user_id': user.id, 'email': user.email})
        else:
            return JsonResponse({'error': "Неверные данные"}, status = 401)
    return JsonResponse({'error': "Только POST"}, status = 405)
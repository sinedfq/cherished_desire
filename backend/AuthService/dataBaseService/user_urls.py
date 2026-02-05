from django.urls import path
from .views import get_current_user, get_user, user_login, user_register

urlpatterns = [
    path("users/<int:user_id>", get_user),
    path("register", user_register),
    path("login", user_login),
    path("user", get_current_user),
]
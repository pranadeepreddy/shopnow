from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView

from shopnowapp.serializer import UserLoginSerializer


class UserLoginView(ListAPIView):
    serializer_class = UserLoginSerializer

    def get_queryset(self):
        return User.objects.filter(username = self.request.user.username)
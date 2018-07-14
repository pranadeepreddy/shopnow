from rest_framework.permissions import BasePermission
from django.contrib.auth.models import User

class IsMerchant(BasePermission):

    def has_permission(self, request, view):
        return User.objects.filter(username = request.user.username, groups__name='merchant').exists()

class IsCustomer(BasePermission):

    def has_permission(self, request, view):
        return User.objects.filter(username = request.user.username, groups__name='customer').exists()
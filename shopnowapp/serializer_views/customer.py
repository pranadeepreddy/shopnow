
from rest_framework.generics import ListAPIView,UpdateAPIView,CreateAPIView,DestroyAPIView
from rest_framework.permissions import AllowAny

from shopnowapp.serializer import *
from rest_framework.permissions import IsAuthenticated
from shopnowapp.serializer_views.permissions import IsCustomer

class ViewCustomer(ListAPIView):
    permission_classes = (IsCustomer, IsAuthenticated)
    serializer_class = CustomerProfileSerializer

    def get_queryset(self):
        queryset = Customer.objects.filter(user__username__exact = self.request.user.username)
        return queryset

class CreateCustomer(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CustomerProfileSerializer
    queryset = Customer.objects.all()


class EditCustomer(UpdateAPIView):
    permission_classes = (IsCustomer, IsAuthenticated)
    serializer_class = CustomerProfileSerializer

    def get_queryset(self):
        queryset = Customer.objects.filter(pk=self.kwargs['pk'])
        return queryset


class DeleteCustomer(DestroyAPIView):
    serializer_class = CustomerProfileSerializer

    def get_queryset(self):
        queryset = Customer.objects.filter(pk=self.kwargs['pk'])
        return queryset



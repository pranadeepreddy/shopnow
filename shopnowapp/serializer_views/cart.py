from rest_framework.generics import ListAPIView,UpdateAPIView,CreateAPIView,DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from shopnowapp.serializer import *
from shopnowapp.serializer_views import IsCustomer

class ViewCart(ListAPIView):
    permission_classes = (IsCustomer, IsAuthenticated)
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(customer__user__username__exact = self.request.user.username).order_by('date_added')[::-1]


class CreateCart(CreateAPIView):
    permission_classes = (IsCustomer, IsAuthenticated)
    serializer_class = CartSerializer
    queryset = Cart.objects.all()



class EditCart(UpdateAPIView):
    permission_classes = (IsCustomer, IsAuthenticated)
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(pk=self.kwargs['pk'], customer__user__username__exact = self.request.user.username)


class DeleteCart(DestroyAPIView):
    permission_classes = (IsCustomer, IsAuthenticated)
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(pk = self.kwargs['pk'], customer__user__username__exact = self.request.user.username)
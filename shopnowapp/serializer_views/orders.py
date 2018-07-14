from rest_framework.generics import ListAPIView,UpdateAPIView,CreateAPIView,DestroyAPIView

from shopnowapp.serializer import *
from shopnowapp.serializer_views import IsCustomer, IsAuthenticated, IsMerchant


class ViewOrders(ListAPIView):
    permission_classes = (IsCustomer, IsAuthenticated)
    serializer_class = OrdersSerializer

    def get_queryset(self):
        return Orders.objects.filter(customer__user__username__exact = self.request.user.username).order_by('date_ordered')[::-1]
    
    
    
class CreateOrders(CreateAPIView):
    permission_classes = (IsCustomer, IsAuthenticated)
    serializer_class = OrdersSerializer
    queryset = Orders.objects.all()


class EditOrders(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrdersSerializer

    def get_queryset(self):
        return Orders.objects.filter(pk=self.kwargs['pk'])


class DeleteOrders(DestroyAPIView):
    permission_classes = (IsCustomer, IsAuthenticated)
    serializer_class = OrdersSerializer

    def get_queryset(self):
        return Orders.objects.filter(pk = self.kwargs['pk'], customer__user__username__exact = self.request.user.username)



class MyOrders(ListAPIView):
    permission_classes = (IsMerchant, IsAuthenticated)
    serializer_class = OrdersSerializer

    def get_queryset(self):
        return Orders.objects.filter(product__merchant__user__username__exact = self.request.user.username).order_by('date_ordered')[::-1]
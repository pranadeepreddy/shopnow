from rest_framework.generics import ListAPIView,UpdateAPIView,CreateAPIView,DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from shopnowapp.serializer import *
from shopnowapp.serializer_views.permissions import IsMerchant


class ViewMerchant(ListAPIView):
    permission_classes = (IsMerchant, IsAuthenticated)
    serializer_class = MerchantProfileSerializer

    def get_queryset(self):
        queryset = Merchant.objects.filter(user__username__exact = self.request.user.username)
        return queryset


class CreateMerchant(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = MerchantProfileSerializer
    queryset = Merchant.objects.all()


class EditMerchant(UpdateAPIView):
    permission_classes = (IsMerchant, IsAuthenticated)
    serializer_class = MerchantProfileSerializer

    def get_queryset(self):
        queryset = Merchant.objects.filter(pk=self.kwargs['pk'])
        return queryset


class DeleteMerchant(DestroyAPIView):
    permission_classes = (IsMerchant, IsAuthenticated)
    serializer_class = MerchantProfileSerializer

    def get_queryset(self):
        queryset = Merchant.objects.filter(pk=self.kwargs['pk'])
        return queryset



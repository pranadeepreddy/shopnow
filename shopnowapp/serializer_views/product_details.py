from django.http import JsonResponse
from rest_framework.generics import ListAPIView,UpdateAPIView,CreateAPIView,DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from shopnowapp.serializer import *
from shopnowapp.serializer_views.permissions import *
from rest_framework.response import Response
from rest_framework import status

class ViewProductDetails(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductDetailSerializer

    def get_queryset(self):
        return Product.objects.filter(pk = self.kwargs['pk'])

class CreateProduct(CreateAPIView):
    permission_classes = (IsMerchant,IsAuthenticated)
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all()




class EditProductDetails(UpdateAPIView):
    permission_classes = (IsMerchant, IsAuthenticated)
    serializer_class = ProductDetailSerializer

    def get_queryset(self):
        return Product.objects.filter(id=self.kwargs['pk'], merchant__user__username__exact = self.request.user.username)



class DeleteProduct(DestroyAPIView):
    permission_classes = (IsMerchant, IsAuthenticated)
    serializer_class = ProductDetailSerializer


    def get_queryset(self):
        return Product.objects.filter(pk=self.kwargs['pk'], merchant__user__username__exact = self.request.user.username)

    def delete(self, request, *args, **kwargs):
        Product.objects.filter(pk=self.kwargs['pk'], merchant__user__username__exact=self.request.user.username).update(deleted = True)
        return Response(status=status.HTTP_204_NO_CONTENT)
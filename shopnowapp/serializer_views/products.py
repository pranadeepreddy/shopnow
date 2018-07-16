

from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from shopnowapp.serializer import *
from shopnowapp.serializer_views.permissions import *
from django.db.models import Q

class Products(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer



    def get_queryset(self):
        if 'search' in self.request.GET:
            queryset = Product.objects.filter(Q(name__icontains = self.request.GET['search']) | Q(brand__icontains = self.request.GET['search'])).order_by('added_date')[::-1]
        else:
            queryset = Product.objects.filter(deleted = False).order_by('added_date')[::-1]
        return queryset

class ProductData(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(pk=self.kwargs['pk']).filter(deleted = False)
        return queryset

class MyProducts(ListAPIView):
    permission_classes = (IsMerchant, AllowAny)
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(merchant_id=self.kwargs['pk']).filter(deleted = False)[::-1]
        return queryset

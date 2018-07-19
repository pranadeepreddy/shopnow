from rest_framework import pagination
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from shopnowapp.serializer import *
from shopnowapp.serializer_views.permissions import *
from django.db.models import Q
from django.contrib import postgres


class Pagination(pagination.PageNumberPagination):
    page_size = 4


class Products(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer
    pagination_class = Pagination


    def get_queryset(self):
        if 'search' in self.request.GET:
            queryset = Product.objects.filter(deleted = False).filter(Q(category__icontains = self.request.GET['search']) | Q(name__icontains = self.request.GET['search']) | Q(brand__icontains = self.request.GET['search'])).order_by('added_date')[::-1]
        else:
            queryset = Product.objects.filter(deleted = False).order_by('added_date')[::-1]
        return queryset

class ProductData(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(pk=self.kwargs['pk'])
        return queryset

class MyProducts(ListAPIView):
    permission_classes = (IsMerchant, AllowAny)
    serializer_class = ProductSerializer
    pagination_class = Pagination


    def get_queryset(self):
        queryset = Product.objects.filter(merchant_id=self.kwargs['pk'])[::-1]
        return queryset

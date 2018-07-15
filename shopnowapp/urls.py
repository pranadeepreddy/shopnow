
from django.urls import path
from shopnowapp.serializer_views import *

app_name = 'shopnowapp'





urlpatterns = [


    path('userdetails/', UserLoginView.as_view(), name = 'login'),

    path('viewcustomer/', ViewCustomer.as_view(), name = 'view_customer'),
    path('addcustomer/', CreateCustomer.as_view(), name = 'add_customer'),
    path('editcustomer/<int:pk>/', EditCustomer.as_view(), name = 'edit_customer'),
    path('deletecustomer/<int:pk>/', DeleteCustomer.as_view(), name='delete_customer'),



    path('viewmerchant/', ViewMerchant.as_view(), name = 'view_merchant'),
    path('addmerchant/', CreateMerchant.as_view(), name='add_merchant'),
    path('editmerchant/<int:pk>/', EditMerchant.as_view(), name='edit_merchant'),
    path('deletemerchant/<int:pk>/', DeleteMerchant.as_view(), name='delete_merchant'),



    path('products/', Products.as_view(), name = 'products'),
    path('product/<int:pk>/', ProductData.as_view(), name = 'product'),
    path('myproducts/<int:pk>/', MyProducts.as_view(), name = 'merchant_products'),


    path('productdetails/<int:pk>/', ViewProductDetails.as_view(), name = 'product_details'),
    path('addproduct/', CreateProduct.as_view() ,name = 'add_product'),
    path('editproduct/<int:pk>/', EditProductDetails.as_view(), name = 'edit_product'),
    path('deleteproduct/<int:pk>/', DeleteProduct.as_view(), name = 'delete_product'),



    path('cart/', ViewCart.as_view(), name = 'cart'),
    path('addcart/', CreateCart.as_view(), name = 'add_cart'),
    path('editcart/<int:pk>/', EditCart.as_view(), name = 'edit_cart'),
    path('deletecart/<int:pk>/', DeleteCart.as_view(), name = 'delete_cart'),

    path('orders/', ViewOrders.as_view(), name = 'orders'),
    path('placeorder/', CreateOrders.as_view(), name = 'add_order'),
    path('editorder/<int:pk>/', EditOrders.as_view(), name = 'edit_order'),
    path('deleteorder/<int:pk>/', DeleteOrders.as_view(), name = 'delete_order'),
    path('myorders/<int:pk>/<int:status>/', MyOrders.as_view(), name = 'merchant_orders'),


]

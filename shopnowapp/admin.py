from django.contrib import admin
from .models import *


# Register your models here.

admin.site.register(Customer)
admin.site.register(Merchant)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Orders)
admin.site.register(Rating)
admin.site.register(Reviews)
admin.site.register(OrderComplaints)
admin.site.register(Complaints)

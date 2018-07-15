
# Create your models here.


from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    status = models.IntegerField(default=1)  # pending = 0    blocked = -1    allowed = 1
    house_no = models.CharField(max_length=32)
    street = models.CharField(max_length=32)
    city = models.CharField(max_length=32)
    state = models.CharField(max_length=32)
    pin = models.IntegerField()
    landmark = models.CharField(max_length=32)

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class Merchant(models.Model):
    company_name = models.CharField(max_length=32)
    company_email = models.CharField(max_length=32)
    status = models.IntegerField(default = 0)   # pending = 0    blocked = -1    allowed = 1
    house_no = models.CharField(max_length=32)
    street = models.CharField(max_length=32)
    city = models.CharField(max_length=32)
    state = models.CharField(max_length=32)
    pin = models.IntegerField()
    landmark = models.CharField(max_length=32)
    aadhar_no = models.IntegerField()

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class Product(models.Model):
    category = models.CharField(max_length=64)
    name = models.CharField(max_length=128)
    brand = models.CharField(max_length=64)
    stock_left = models.IntegerField()
    image = models.ImageField(upload_to = "product_images")
    price = models.DecimalField(max_digits=10,decimal_places=2)
    discount = models.IntegerField()
    description = models.CharField(max_length=512)
    specification = models.CharField(max_length=512)
    added_date = models.DateField(auto_now=True)
    deleted = models.BooleanField(default=False)

    merchant = models.ForeignKey(Merchant, on_delete=models.CASCADE)

    def __str__(self):
        return self.id

class Cart(models.Model):
    date_added = models.DateTimeField(auto_now=True)
    count = models.IntegerField(default=1)

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.id

class Orders(models.Model):
    type = models.IntegerField(default = 3)   # return = 1    replace = 2    others = 3
    status = models.IntegerField(default = 1)  # pending = 1    shipping = 2    rejected = 3   cancelled = 4 delivered = 5
    house_no = models.CharField(max_length=32)
    street = models.CharField(max_length=32)
    city = models.CharField(max_length=32)
    state = models.CharField(max_length=32)
    pin = models.IntegerField()
    landmark = models.CharField(max_length=32)
    date_ordered = models.DateTimeField(auto_now=True)
    date_delivered = models.DateField(null = True,blank = True)
    count = models.IntegerField(default=1)
    cost = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.id



class Rating(models.Model):
    rating = models.IntegerField()

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class Reviews(models.Model):
    review = models.CharField(max_length=128)
    date = models.DateTimeField(auto_now=True)

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class OrderComplaints(models.Model):
    type = models.IntegerField()  # return = 1    replace = 2
    description = models.CharField(max_length=256)
    status = models.IntegerField()   #  not yet processed =  1     processed = 2

    orders = models.ForeignKey(Orders, on_delete=models.CASCADE)

    def __str__(self):
        return self.id

class Complaints(models.Model):
    title = models.CharField(max_length=32)
    description = models.CharField(max_length=256)
    status = models.IntegerField()   #  not yet processed =  1     processed = 2

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return self.id

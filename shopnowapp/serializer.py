from rest_framework import serializers
from shopnowapp.models import *
from django.contrib.auth.models import Group
from django.db.models import F


class UserLoginSerializer(serializers.HyperlinkedModelSerializer):
    #extra_field = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('username',)

    

    def to_representation(self, instance):
        representation = super(UserLoginSerializer, self).to_representation(instance)
        type = 1 # customer = 1    merchant = 2
        queryset = Merchant.objects.filter(user__username = instance).values_list('id','status')
        if(len(queryset) == 0):
            queryset = Customer.objects.filter(user__username=instance).values_list('id','status')
            type = 1
        else:
            type = 2

        representation['p_id'] = queryset[0][0]
        representation['type'] = type
        representation['status'] = queryset[0][1]
        return representation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password')


class CustomerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Customer
        fields = ('user','house_no','street','city','state','pin','landmark')



    def create(self, validated_data):
        user_data = validated_data.pop('user')
        print(dict(user_data))
        user = User.objects.create_user(**user_data)
        g = Group.objects.get(name='customer')
        g.user_set.add(user)
        return Customer.objects.create(**validated_data, user_id = user.id)

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        instance.__dict__.update(**validated_data)
        instance.save()
        user.__dict__.update(user_data)
        user.save()
        return instance



class MerchantProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Merchant
        fields = ('user','company_name','company_email','status','aadhar_no', 'house_no', 'street', 'city', 'state', 'pin', 'landmark')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        g = Group.objects.get(name='merchant')
        g.user_set.add(user)
        return Merchant.objects.create(**validated_data, user_id = user.id)

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        instance.__dict__.update(**validated_data)
        instance.save()
        user.__dict__.update(user_data)
        user.save()
        return instance



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'brand', 'image', 'price' ,'discount','added_date', 'stock_left', 'merchant')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['merchant'] = MerchantCompanyDetails(
            Merchant.objects.get(pk=data['merchant'])).data
        return data

class MerchantCompanyDetails(serializers.ModelSerializer):
    lookup_field = 'pk'
    class Meta:
        model = Merchant
        fields = ('id','company_name','company_email')



class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['merchant'] = MerchantCompanyDetails(
            Merchant.objects.get(pk=data['merchant'])).data
        return data



class CustomerIdSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Customer
        fields = ('id', 'user')

# class ProductIdSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ('id',)



class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['product'] = ProductSerializer(
            Product.objects.get(pk=data['product'])).data
        data['customer'] = CustomerIdSerializer(
            Customer.objects.get(pk=data['customer'])).data
        return data


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['product'] = ProductSerializer(
            Product.objects.get(pk=data['product'])).data
        data['customer'] = CustomerIdSerializer(
            Customer.objects.get(pk=data['customer'])).data
        return data

    def create(self, validated_data):

        Product.objects.filter(pk = validated_data['product'].id).update(stock_left=F('stock_left') - validated_data['count'])
        return Orders.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if validated_data['status'] == 3 or validated_data['status'] == 4:
            Product.objects.filter(id=instance.product_id).update(stock_left=F('stock_left') + instance.count)
        instance.__dict__.update(**validated_data)
        instance.save()
        return instance



class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

    def create(self, validated_data):
        return Rating.objects.create(**validated_data)


class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'

    def create(self, validated_data):
        return Reviews.objects.create(**validated_data)


class OrderComplaintsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderComplaints
        fields = '__all__'

    def create(self, validated_data):
        return OrderComplaints.objects.create(**validated_data)



class ComplaintsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaints
        fields = '__all__'

    def create(self, validated_data):
        return Complaints.objects.create(**validated_data)



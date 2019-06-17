from rest_framework import serializers
from .models import User, Shell, Item, Order, Shipping_address



class Shipping_addressSerializer(serializers.ModelSerializer):
    querySet = Shipping_address.objects.all()
    
    class Meta:
        model = Shipping_address
        fields = ('id', 'line1', 'city', 'state', 'country', 'postal_code')

class UserSerializer(serializers.ModelSerializer):
    querySet = User.objects.all()
    shipping_address = Shipping_addressSerializer(
        many=False, read_only=True
    )
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'shipping_address')

class ShellSerializer(serializers.ModelSerializer):
    querySet = Shell.objects.all()

    class Meta:
        model = Shell
        fields = ('id', 'name', 'image_url', 'status_field', 'description', 'price', 'sku')

class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(
        read_only=True, many=False
    )

    class Meta:
        model = Order
        fields = ('id', 'name', 'user')
        
class ItemSerializer(serializers.ModelSerializer):

    shell = ShellSerializer(
        # view_name='shell-detail',
        many=False,
        read_only=True,
    )
    order = OrderSerializer(
        # view_name='order-detail',
        many=False,
        read_only=True,

    )
    class Meta:
       model = Item
       fields = ('id', 'shell', 'quantity', 'order')

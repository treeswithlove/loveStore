from rest_framework import serializers
from .models import User, Shell, Item, Order

class UserSerializer(serializers.ModelSerializer):
    querySet = User.objects.all()
    
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')

class ShellSerializer(serializers.ModelSerializer):
    querySet = Shell.objects.all()

    class Meta:
        model = Shell
        fields = ('id', 'name', 'image_url', 'purchase_status', 'status_field', 'description', 'price',)

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True
    )

    class Meta:
        model = Order
        fields = ('id', 'name', 'user')
        
class ItemSerializer(serializers.ModelSerializer):

    shell = serializers.PrimaryKeyRelatedField(
        # view_name='shell-detail',
        many=False,
        read_only=True,
    )
    order = serializers.PrimaryKeyRelatedField(
        # view_name='order-detail',
        many=False,
        read_only=True,

    )
    class Meta:
       model = Item
       fields = ('id', 'shell', 'quantity', 'order')

from rest_framework import serializers
from .models import User, Shell, Item, Order

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')

class ShellSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Shell
        fields = ('id', 'name', 'image_url', 'purchase_status', 'status_field', 'description', 'price',)

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    User = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True
    )
    class Meta:
        model = Order
        fields = ('id', 'name', 'user')
        
class ItemSerializer(serializers.HyperlinkedModelSerializer):
    Shell = serializers.HyperlinkedRelatedField(
        view_name='shell-detail',
        many=True,
        read_only=True
    )
    Order = serializers.HyperlinkedRelatedField(
        view_name='order-detail',
        many=True,
        read_only=True
    )
    class Meta:
       model = Item
       fields = ('id', 'shell', 'quantity', 'order')

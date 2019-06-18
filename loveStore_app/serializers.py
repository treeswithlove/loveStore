from rest_framework import serializers
from .models import User, Shell, Order 


class UserSerializer(serializers.ModelSerializer):
    querySet = User.objects.all()
   
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'address_line1', 'city', 'state', 'country', 'postal_code')

class OrderSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Order
        fields = ('id', 'name')
      
class ShellSerializer(serializers.ModelSerializer):
    querySet = Shell.objects.all()

    class Meta:
        model = Shell
        fields = ('id', 'name', 'image_url', 'description', 'price', 'sku', 'quantity')

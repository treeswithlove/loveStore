from rest_framework import viewsets

from .serializers import ShellSerializer, OrderSerializer, ItemSerializer, UserSerializer, Shipping_addressSerializer
from .models import User, Shell, Item, Order, Shipping_address
from django.views import View
from django.http import JsonResponse
import stripe
from decouple import config

stripe.api_key = config("API_KEY")





class Shipping_addressView(viewsets.ModelViewSet):
    queryset = Shipping_address.objects.all()
    serializer_class = Shipping_addressSerializer

class ShellView(viewsets.ModelViewSet):
    queryset = Shell.objects.all()
    serializer_class = ShellSerializer

class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class ItemView(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class =ItemSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class StripeView(View):
    def get(self, request, *args, **kwargs):
        shell = request.GET['shell']
        quantity = request.GET['quantity']
        name = request.GET['name']
        address = request.GET['address']
        # line1 = request.GET['line1']
        # city = request.GET['city']
        # state = request.GET['state']
        # country = request.GET['country']
        # postal_code = request.GET['postal_code']
        sku = request.GET['sku']
        
        result = stripe.Charge.list()
        createdOrder = stripe.Order.create(
            currency = 'usd',
            items = [
                {
                    "type": "sku",
                    "parent": sku

                }
            ],
            shipping={
                "name":name,
                address:{
                #     "line1": line1,
                #     "city": city,
                #     "state": state,
                #     "country": country,
                #     "postal_code": postal_code
                # 
                },
  },
        )
        print(result)
        return JsonResponse(result, safe=False)
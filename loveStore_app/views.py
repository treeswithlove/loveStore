from rest_framework import viewsets

from .serializers import ShellSerializer, OrderSerializer, ItemSerializer, UserSerializer
from .models import User, Shell, Item, Order
from django.views import View
from django.http import JsonResponse
import stripe
from decouple import config

stripe.api_key = config("API_KEY")





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
        result = stripe.Charge.list()
        createdOrder = stripe.Order.create(
            currency = 'usd',
            # items= [
            #     {
            #         "description": "test"
            #         # "amount": 3,
            #         # "type": "sku",
            #         # "parent":'sku_FFwXDIb7oLRG1B'

            #     }
            # ]
            items = [
                {
                    "type": "sku",
                    "parent": "sku_FFy2POOAuAq2iT"

                }
            ],
            shipping={
                "name":name,
                "address":{
                    "line1":'1234 Main Street',
                    "city":'San Francisco',
                    "state":'CA',
                    "country":'US',
                    "postal_code":'94111'
                },
  },
        )
        print(result)
        # json = {"test":"the", 'shell': shell, 'quantity': quantity}
        return JsonResponse(result, safe=False)
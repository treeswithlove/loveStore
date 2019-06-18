from rest_framework import viewsets

from .serializers import ShellSerializer, OrderSerializer, UserSerializer
from .models import User, Shell, Order
from django.views import View
from django.http import JsonResponse
from decouple import config
import stripe

stripe.api_key = config("API_KEY")

class ShellView(viewsets.ModelViewSet):
    queryset = Shell.objects.all()
    serializer_class = ShellSerializer

class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class StripeView(View):
    def get(self, request, *args, **kwargs):
        shell = request.GET['shell']
        quantity = request.GET['quantity']
        # result = stripe.Charge.list()
        createdOrder = stripe.Order.create(
            currency = 'usd',
            items = [
                {
                    "type": "sku",
                    "parent": shell,
                    "quantity": quantity

                }
            ],
             shipping={
                    "name":'User Name',
                    "address":{
                    "line1":'1234 Main Street',
                    "city":'Atlanta',
                    "state":'GA',
                    "country":'US',
                    "postal_code":'30312'
                    },
            },
        )
        result = stripe.Order.list(limit=1)
        print(result)
        # json = {"test":"the", 'shell': shell, 'quantity': quantity}
        return JsonResponse(result, safe=False) 
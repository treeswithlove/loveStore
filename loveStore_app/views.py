from rest_framework import viewsets

from .serializers import ShellSerializer, OrderSerializer, ItemSerializer, UserSerializer
from .models import User, Shell, Item, Order
from django.views import View
from django.http import JsonResponse


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
        json = {"test":"the", 'shell': shell, 'quantity': quantity}
        return JsonResponse(json, safe=False)
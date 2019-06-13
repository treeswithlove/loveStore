from rest_framework import viewsets

from .serializers import ShellSerializer, OrderSerializer, ItemSerializer, UserSerializer
from .models import User, Shell, Item, Order


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
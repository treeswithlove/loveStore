from rest_framework import viewsets

from .serializers import ShellSerializer, OrderSerializer, UserSerializer
from .models import User, Shell, Order
from django.views import View
from django.http import JsonResponse
from decouple import config

class ShellView(viewsets.ModelViewSet):
    queryset = Shell.objects.all()
    serializer_class = ShellSerializer

class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
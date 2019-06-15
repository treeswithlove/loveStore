from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('orders', views.OrderView)
router.register('users', views.UserView)
router.register('shells', views.ShellView)
router.register('users', views.UserView)


urlpatterns = [
    path('', include(router.urls)),
    path('stripe', views.StripeView.as_view(), name='stripe')
]

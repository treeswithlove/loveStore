from django.contrib import admin

# Register your models here.
from .models import User, Item, Shell, Order, Shipping_address

admin.site.register(User)
admin.site.register(Item)
admin.site.register(Shell)
admin.site.register(Order)
admin.site.register(Shipping_address)
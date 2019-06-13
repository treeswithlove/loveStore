from django.contrib import admin

# Register your models here.
from .models import User, Item, Shell, Order

admin.site.register(User)
admin.site.register(Item)
admin.site.register(Shell)
admin.site.register(Order)
from django.contrib import admin

# Register your models here.
from .models import User, Shell, Order 

admin.site.register(User)
admin.site.register(Shell)
admin.site.register(Order)

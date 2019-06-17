from django.db import models


class Shipping_address(models.Model):
    line1 = models.CharField(default = '', max_length = 50)
    city = models.CharField(default = '', max_length = 50)
    state = models.CharField(default = '', max_length = 50)
    country = models.CharField(default = '', max_length = 50)
    postal_code = models.DecimalField(default = '', max_digits=5, decimal_places=0)
    
    def __str__(self):
        return self.line1

class User(models.Model):
    first_name = models.CharField(default = '', max_length = 30)
    last_name = models.CharField(default = '', max_length = 30)
    email = models.EmailField(default = '',  max_length = 50)
    shipping_address = models.ForeignKey(Shipping_address, on_delete = 'CASCADE', related_name = 'User')

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)

class Shell(models.Model):
    name = models.CharField(default = '', max_length = 100)
    image_url = models.CharField(default = '', max_length = 512)
    purchase_status = (
        ('Reserved', 'Reserved'),
        ('Available', 'Available'),
        ('Out of Stock', 'Unavailable'), 
    )
    status_field = models.CharField( max_length=25, choices=purchase_status, blank=True, default='', help_text='Shell availability',)
    description = models.TextField(default = '', max_length = 1000)
    price = models.DecimalField(default = '00.00', max_digits=4, decimal_places=2)
    sku = models.CharField(default = '',  max_length = 50)

    def __str__(self):
        return self.name

class Order(models.Model):
    name = models.CharField(default = '', max_length = 30)
    user = models.ForeignKey(User, on_delete = 'CASCADE', related_name = 'Order')

    def __str__(self):
        return self.name
    
class Item(models.Model):
    shell = models.ForeignKey(Shell, on_delete = 'CASCADE', related_name = 'Item')
    quantity = models.IntegerField(default = '')
    order = models.ForeignKey(Order, on_delete = 'SET_NULL', related_name = 'Item')
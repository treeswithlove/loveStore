from django.db import models



class User(models.Model):
    first_name = models.CharField(default = '', max_length = 30)
    last_name = models.CharField(default = '', max_length = 30)
    email = models.EmailField(default = '',  max_length = 50)
    address_line1 = models.CharField(default = '', max_length = 50)
    city = models.CharField(default = '', max_length = 50)
    state = models.CharField(default = '', max_length = 50)
    country = models.CharField(default = '', max_length = 50)
    postal_code = models.DecimalField(default = '', max_digits=5, decimal_places=0)

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)


class Order(models.Model):
    name = models.CharField(default = '', max_length = 30)

    def __str__(self):
        return self.name

class Shell(models.Model):
    name = models.CharField(default = '', max_length = 100)
    image_url = models.CharField(default = '', max_length = 512)
    description = models.TextField(default = '', max_length = 1000)
    price = models.DecimalField(default = '00.00', max_digits=4, decimal_places=2)
    sku = models.CharField(default = '',  max_length = 50)
    quantity = models.DecimalField(default = '00', max_digits=4, decimal_places=0)

    def __str__(self):
        return self.name

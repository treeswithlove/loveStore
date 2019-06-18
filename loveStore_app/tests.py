from django.test import TestCase
import json
import requests
from django.http import HttpResponse

url = 'https://fcc-weather-api.glitch.me/'

data = requests.get('https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139').json()

# print(data[1].weather[0].main)
print(data['weather'][0]['icon'])
print(data['weather'][0]['main'])
print(data['main']['temp'])

# Create your tests here.

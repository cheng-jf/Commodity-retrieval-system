from django.db import models

# Create your models here.
from django.db import models
import json


# Create your models here.
class Goods(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000)
    available = models.IntegerField()
    image = models.CharField(max_length=1000)
    simple_image = models.CharField(max_length=1000)
    detail = models.CharField(max_length=1000)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.name

    def getSimpleJson(self):
        data = {'id': self.id, 'name': self.name, 'available': self.available, 'simple_image': self.simple_image}
        return data

    def getGoodsJson(self):
        data = {'id': self.id, 'name': self.name, 'available': self.available, 'image': self.image,
                'detail': self.detail, 'pub_date': self.pub_date.strftime('%Y-%m-%d')}
        return data

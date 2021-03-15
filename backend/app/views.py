from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
import json
# Create your views here.
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Goods
import os


def index(request):
    return HttpResponse("Welcome to simple goods search system ~")


@csrf_exempt
def search(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data['name']
        res = Goods.objects.filter(name__icontains=name)
        ret = {'status': True, 'data': []}
        for item in res:
            ret['data'].append(item.getSimpleJson())
        return HttpResponse(json.dumps(ret, ensure_ascii=False), content_type='application/json')
    else:
        ret = {'status': False, 'data': 'It is not a POST request!!!'}
        return HttpResponse(json.dumps(ret), content_type='application/json')


@csrf_exempt
def sendImage(request, id):
    d = os.getcwd()
    print(d)
    image_path = d + "/images/" + str(id) + ".png"
    image_data = open(image_path, "rb").read()
    return HttpResponse(image_data, content_type="image/png")


@csrf_exempt
def getDetail(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        id = data['id']
        res = Goods.objects.get(id=id).getGoodsJson()
        print(res)
        ret = {'status': True, 'data': res}
        return HttpResponse(json.dumps(ret, ensure_ascii=False), content_type='application/json')
    else:
        ret = {'status': False, 'data': 'It is not a POST request!!!'}
        return HttpResponse(json.dumps(ret), content_type='application/json')

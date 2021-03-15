from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search/', views.search, name='search'),
    path('img/<int:id>/', views.sendImage, name='sendImage'),
    path('detail/', views.getDetail, name='getDetail'),
]

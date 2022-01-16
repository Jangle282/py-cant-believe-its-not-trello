# from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CardSerializer, ColumnSerializer
from .models import Card, Column

# def index(request):
#     return HttpResponse("I can't believe its not Trello - home page.")

# Create your views here.

class CardView(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()

class ColumnView(viewsets.ModelViewSet):
    serializer_class = ColumnSerializer
    queryset = Column.objects.all()

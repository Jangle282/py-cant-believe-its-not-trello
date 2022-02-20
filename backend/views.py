# from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
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

    @action(detail=True, methods=['PUT'])
    def order(self, request, pk=None):
        columns = Column.objects.all()
        for col in columns:
            newOrder = [item.get('index') for item in request.data if item.get('id')==col.id]
            col.order = newOrder[0]
            col.save(update_fields=['order'])
        
        return Response("Hello world")
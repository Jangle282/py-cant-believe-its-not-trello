from rest_framework import serializers
from .models import Card, Column

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'name', 'description', 'column', 'order')

class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ('id', 'name', 'order')
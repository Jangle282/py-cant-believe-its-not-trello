from django.db import models

# Create your models here.

class Column(models.Model):
    name = models.CharField(max_length=200)
    order = models.IntegerField(default=-1)

    def __str__(self):
        return self.name
            

class Card(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    column = models.ForeignKey(Column, related_name='cards', on_delete=models.CASCADE)
    order = models.IntegerField(default=-1)

    def __str__(self):
        return self.name



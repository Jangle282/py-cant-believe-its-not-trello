from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return HttpResponse("I can't believe its not Trello - home page.")



# Create your views here.

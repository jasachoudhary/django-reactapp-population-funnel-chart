from django.shortcuts import render
from .serializers import PopulationSerializer
from .models import Population
from rest_framework.generics import ListAPIView

# Create your views here.

class PopulationList(ListAPIView):
    queryset = Population.objects.all()
    serializer_class = PopulationSerializer

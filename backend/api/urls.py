from django.urls import path
from api import views

urlpatterns = [
    path('population/', views.PopulationList.as_view())
]
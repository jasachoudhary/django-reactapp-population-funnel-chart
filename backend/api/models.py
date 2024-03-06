from django.db import models

# Create your models here.

class Population(models.Model):
    age_range = models.CharField(max_length=10)
    male_population = models.IntegerField()
    female_population = models.IntegerField()
    

from django.db import models

# Create your models here.
class prioridad (models.Model):
    nombre = models.CharField(max_length=50)
    nivel = models.IntegerField

    def __str__(self):
        return self.nombre

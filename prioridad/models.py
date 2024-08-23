from django.db import models

# Create your models here.
class prioridad (models.Model):
    nivel = models.IntegerField

    def __str__(self):
        return self.nivel

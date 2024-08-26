from django.db import models

# Create your models here.
class estado (models.Model):
    nombre = models.CharField(max_length=50)
    proceso = models.IntegerField(default=1)

    def __str__(self):
        return self.nombre

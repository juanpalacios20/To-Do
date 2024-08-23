from django.db import models

# Create your models here.
class tareas (models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=500)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo
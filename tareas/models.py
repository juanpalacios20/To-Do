from django.db import models
from django.contrib.auth.models import User
from estado.models import estado
from prioridad.models import prioridad

# Create your models here.
class tareas (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=500)
    done = models.BooleanField(default=False)
    Fecha = models.DateField
    estado = models.ForeignKey(estado, on_delete=models.CASCADE)
    prioridad = models.ForeignKey(prioridad, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo
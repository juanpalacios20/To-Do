from django.db import models
from django.contrib.auth.models import User
from estado.models import estado
from categoria.models import categoria
import datetime
from django.utils import timezone

# Create your models here.
class tareas (models.Model):
    user = models.ManyToManyField(User, default=[1])
    titulo = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=500)
    estado = models.ForeignKey(estado, on_delete=models.CASCADE, default=1)
    categoria = models.ForeignKey(categoria, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.titulo
    
   # def actualizar_estado(self):
        # 'self' aquí se refiere a la instancia actual de 'Tarea'
        if timezone.now().date() > self.fecha:
            # Cambia el estado a "NOT Done" si la fecha actual es mayor que la fecha de creación
            estado_not_done = estado.objects.get(nombre="Sin hacer")
            self.estado = estado_not_done
            self.save()

    # Sobrescribe el método 'save' para actualizar el estado automáticamente al guardar
   # def save(self, *args, **kwargs):
        self.actualizar_estado()  # Llama al método actualizar_estado antes de guardar
        super(tareas, self).save(*args, **kwargs)

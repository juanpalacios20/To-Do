from django.db import models

# Create your models here.
class estado (models.Model):
    nombre = models.CharField(max_length=50)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

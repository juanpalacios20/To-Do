from django.db import models

# Create your models here.
class estado (models.Model):
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.done

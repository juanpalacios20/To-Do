from rest_framework import serializers
from .models import tareas

class TareasSerializar(serializers.ModelSerializer):
    class Meta:
        model = tareas
        fields = '__all__'
        
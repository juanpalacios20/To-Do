# tareas/serializer.py

from rest_framework import serializers
from .models import tareas, estado

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = estado
        fields = ['nombre']  # Solo el nombre del estado

class TareasSerializar(serializers.ModelSerializer):
    estado = EstadoSerializer()  # Usa el serializador para Estado
    categoria = serializers.CharField(source='categoria.nombre', default='')  # Ajusta esto si 'categoria' es un modelo relacionado

    class Meta:
        model = tareas
        fields = ['id', 'titulo', 'descripcion', 'estado', 'categoria']

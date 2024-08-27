from rest_framework import serializers
from .models import tareas, estado, categoria

class TareasSerializar(serializers.ModelSerializer):
    estado = serializers.PrimaryKeyRelatedField(queryset=estado.objects.all(), required=False)
    categoria = serializers.PrimaryKeyRelatedField(queryset=categoria.objects.all(), required=False)

    class Meta:
        model = tareas
        fields = ['id', 'titulo', 'descripcion', 'user', 'estado', 'categoria']

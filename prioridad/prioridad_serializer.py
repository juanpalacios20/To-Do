from rest_framework import serializers
from .models import prioridad

class prioridadSerializar(serializers.ModelSerializer):
    class Meta:
        model = prioridad
        fields = '__all__'
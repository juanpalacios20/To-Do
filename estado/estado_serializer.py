from rest_framework import serializers
from .models import estado

class estadoSerializar(serializers.ModelSerializer):
    class Meta:
        model = estado
        fields = '__all__'
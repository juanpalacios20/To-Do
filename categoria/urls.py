from rest_framework import viewsets
from .categoria_serializer import categoriaSerializar
from .models import categoria

# Create your views here.
class TareasView (viewsets.ModelViewSet):
    serializer_class = categoriaSerializar
    queryset = categoria.objects.all()
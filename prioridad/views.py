from rest_framework import viewsets
from .prioridad_serializer import prioridadSerializar
from .models import prioridad

# Create your views here.
class TareasView (viewsets.ModelViewSet):
    serializer_class = prioridadSerializar
    queryset = prioridad.objects.all()

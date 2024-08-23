from rest_framework import viewsets
from .serializer import TareasSerializar
from .models import tareas

# Create your views here.
class TareasView (viewsets.ModelViewSet):
    serializer_class = TareasSerializar
    queryset = tareas.objects.all()
from rest_framework import viewsets
from .estado_serializer import estadoSerializar
from .models import estado

# Create your views here.
class TareasView (viewsets.ModelViewSet):
    serializer_class = estadoSerializar
    queryset = estado.objects.all()
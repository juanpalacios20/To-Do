from rest_framework import viewsets
from .serializer import TareasSerializar
from .models import tareas
from rest_framework.response import Response


# Create your views here.
class TareasView (viewsets.ModelViewSet):
    serializer_class = TareasSerializar
    queryset = tareas.objects.all()
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

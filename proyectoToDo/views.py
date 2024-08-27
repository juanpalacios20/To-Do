from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from tareas.serializer import TareasSerializar
from tareas.models import tareas  # Renombrado a Tareas
from django.http import JsonResponse
from estado.models import estado
from categoria.models import categoria
from categoria.categoria_serializer import categoriaSerializar
from rest_framework.views import APIView

@api_view(['GET'])
def obtener_tarea(request):
    if request.method == 'GET':
        Tareas = tareas.objects.all()
        serializer = TareasSerializar(Tareas, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "Método no permitido"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def crear_tarea(request):
    data = request.data.copy()

    # Asignar valores predeterminados si no están presentes
    if 'user' not in data:
        data['user'] = [1]  # Usuario predeterminado

    if 'categoria' not in data:
        data['categoria'] = 1  # ID de la categoría por defecto

    if 'estado' not in data:
        data['estado'] = 1  # ID del estado por defecto

    serializer = TareasSerializar(data=data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def editar_tarea(request, id):
    tarea = get_object_or_404(tareas, id=id)
    
    data = request.data.copy()

    if 'estado' in data and isinstance(data['estado'], int):
        data['estado'] = get_object_or_404(estado, id=data['estado']).id

    if 'categoria' in data and isinstance(data['categoria'], int):
        data['categoria'] = get_object_or_404(categoria, id=data['categoria']).id

    serializer = TareasSerializar(tarea, data=data, partial=True)  # partial=True para actualizaciones parciales
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_tarea(request, id):
    tarea = get_object_or_404(tareas, id=id)
    tarea.delete()
    return Response({"message": "Tarea eliminada con éxito"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def actualizar_estado_tarea(request, id):
    try:
        tarea = tareas.objects.get(id=id)
    except tareas.DoesNotExist:
        return Response({"error": "Tarea no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    nuevo_estado_id = request.data.get('estado')
    if nuevo_estado_id:
        try:
            nuevo_estado = estado.objects.get(id=nuevo_estado_id)
            tarea.estado = nuevo_estado
            tarea.save()
            return Response({"message": "Estado actualizado con éxito"}, status=status.HTTP_200_OK)
        except estado.DoesNotExist:
            return Response({"error": "Estado no encontrado"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "Estado no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_categorias(request):
    categorias = categoria.objects.all()
    serializer = categoriaSerializar(categorias, many=True)
    return Response(serializer.data)

class TareaListView(APIView):
    def get(self, request, *args, **kwargs):
        categoria_id = request.query_params.get('categoria', None)
        
        if categoria_id is not None:
            tareas = tareas.objects.filter(categoria_id=categoria_id)
        else:
            tareas = tareas.objects.all()
        
        serializer = TareasSerializar(tareas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

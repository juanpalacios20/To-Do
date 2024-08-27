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
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']  # Incluye cualquier campo que necesites

@api_view(['GET'])
def obtener_usuario(request, id):
    usuario = get_object_or_404(User, id=id)
    serializer = UserSerializer(usuario)
    return Response(serializer.data)

@api_view(['GET'])
def obtener_usuario(request, id):
    try:
        usuario = get_object_or_404(User, id=id)
        data = {
            'username': usuario.username,
            'email': usuario.email,
            'password': usuario.password,  # Nota: No es seguro exponer contraseñas en texto claro.
        }
        return Response(data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def conteo_tareas_por_estado(request):
    usuario_id = 1  # Puedes cambiar esto según sea necesario
    print(f"Contando tareas para usuario con ID: {usuario_id}")

    pendientes = tareas.objects.filter(user=usuario_id, estado=1).count()
    en_proceso = tareas.objects.filter(user=usuario_id, estado=2).count()
    completadas = tareas.objects.filter(user=usuario_id, estado=3).count()

    print(f"Tareas pendientes: {pendientes}")
    print(f"Tareas en proceso: {en_proceso}")
    print(f"Tareas completadas: {completadas}")

    data = {
        'pendientes': pendientes,
        'en_proceso': en_proceso,
        'completadas': completadas
    }
    return Response(data, status=status.HTTP_200_OK)


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

    try:
        nuevo_estado_id = int(request.data.get('estado', -1))
        nuevo_estado = estado.objects.get(id=nuevo_estado_id)
        tarea.estado = nuevo_estado
        tarea.save()
        return Response({"message": "Estado actualizado con éxito"}, status=status.HTTP_200_OK)
    except estado.DoesNotExist:
        return Response({"error": "Estado no encontrado"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({"error": "Estado inválido"}, status=status.HTTP_400_BAD_REQUEST)


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

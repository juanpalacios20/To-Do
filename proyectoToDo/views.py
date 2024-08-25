from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.contrib.auth import logout as django_logout
from tareas.serializer import TareasSerializar
from tareas.models import tareas


@api_view(['GET'])
def obtener_tarea(request):
    id = request.query_params.get("id")
    if not id:
        return Response({'error': 'El ID de la tarea es necesario.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        tarea = tareas.objects.get(id=id)
        serializer = TareasSerializar(tarea)
        return Response(serializer.data)
    except tareas.DoesNotExist:
        return Response({'error': 'Tarea no encontrada'}, status=status.HTTP_404_NOT_FOUND)


    
@api_view(['POST'])
def crear_tarea(request):
    serializer = TareasSerializar(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def editar_tarea(request, id):
    try:
        tarea = tareas.objects.get(id=id)
    except tareas.DoesNotExist:
        return Response({"error": "Tarea no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    serializer = TareasSerializar(tarea, data=request.data, partial=True)  # partial=True para actualizaciones parciales
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_tarea(request, id):
    try:
        tarea = tareas.objects.get(id=id)
    except tareas.DoesNotExist:
        return Response({"error": "Tarea no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    tarea.delete()
    return Response({"message": "Tarea eliminada con éxito"}, status=status.HTTP_204_NO_CONTENT)




 
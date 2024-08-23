from django.urls import path, include 
from rest_framework import routers
from tareas import views

router = routers.DefaultRouter()
router.register( r'prioridad' , views.TareasView, 'prioridad')

urlpatterns = [
    path("api/v1/", include (router.urls))
]
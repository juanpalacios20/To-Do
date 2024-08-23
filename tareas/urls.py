from django.urls import path, include 
from rest_framework import routers
from tareas import views

router = routers.DefaultRouter()
router.register( r'tareas' , views.TareasView, 'tareas')

urlpatterns = [
    path("api/v1/", include (router.urls))
]

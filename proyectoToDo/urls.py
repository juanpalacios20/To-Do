"""
URL configuration for proyectoToDo project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tareas/', include('tareas.urls')),  
    path('estado/', include('estado.urls')),  
    path('categoria/', include('categoria.urls')),
    

    path('tareas/obtener/', views.obtener_tarea, name='obtener_tarea'),  
    path('tareas/crear/', views.crear_tarea, name='crear_tarea'),  
    path('tareas/<int:id>/editar/', views.editar_tarea, name='editar_tarea'),  
    path('tareas/<int:id>/eliminar/', views.eliminar_tarea, name='eliminar_tarea'),  
]

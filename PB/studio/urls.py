from django.urls import path

from .views import  SearchStudioByCurrentLocation, ViewStudio

app_name = 'Studio'

urlpatterns = [

    path('search_studio_by_current_location/<str:lat>/<str:long>/', SearchStudioByCurrentLocation.as_view()),
    path('studio_page/<int:studio_id>/', ViewStudio.as_view()),

]

# edit studio depends on studio id

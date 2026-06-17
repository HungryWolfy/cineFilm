from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, CatalogLandingView

router = DefaultRouter()
router.register(r'', MovieViewSet, basename='movie')

urlpatterns = [
                path('landing/', CatalogLandingView.as_view(), name='catalog-landing'),
              ] + router.urls

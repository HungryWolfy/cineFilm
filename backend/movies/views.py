from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import OrderingFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Genre, Movie
from .serializers import MovieSerializer, GenreLandingSerializer, GenreMinimalSerializer


class DynamicPageNumberPagination(PageNumberPagination):
  page_size = 15
  page_query_param = 'page_size'
  max_page_size = 100


class MovieViewSet(ReadOnlyModelViewSet):
  queryset = Movie.objects.all()
  serializer_class = MovieSerializer
  permission_classes = [AllowAny]
  filter_backends = [OrderingFilter]

  ordering_fields = ['year', 'rating', 'created_at']
  ordering = ['-year']

  def get_queryset(self):
    queryset = super().get_queryset()
    content_type = self.request.query_params.get('content_type')

    if content_type in ('movie', 'tv'):
      queryset = queryset.filter(content_type=content_type)

    genre_slug = self.request.query_params.get('genre')
    if genre_slug:
      queryset = queryset.filter(genres__slug=genre_slug)

    return queryset


class CatalogLandingView(APIView):
  permission_classes = [AllowAny]

  def get(self, request):
    # 1. Собираем общую ленту новинок (не привязанную к жанрам)
    latest_movies = Movie.objects.all().order_by('-year')[:15]
    latest_serializer = MovieSerializer(latest_movies, many=True, context={'request': request})
    all_genres = Genre.objects.all()

    # Собираю только те жанры, которые админ отметил галочкой "is_featured"
    featured_genres = Genre.objects.filter(is_featured=True)
    genres_serializer = GenreLandingSerializer(
      featured_genres,
      many=True,
      context={'request': request}
    )

    all_genres_serializer = GenreMinimalSerializer(
      all_genres,
      many=True
    )

    return Response({
      "latest": latest_serializer.data,
      "genres_sections": genres_serializer.data,
      "genres": all_genres_serializer.data
    })

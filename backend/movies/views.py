from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import AllowAny
from .models import Movie
from .serializers import MovieSerializer


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
        return queryset


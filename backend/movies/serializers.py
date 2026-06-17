from rest_framework import serializers
from .models import Movie, Genre

# Минимальный сериализатор жанров (без вложенных фильмов) для карточек
class GenreMinimalSerializer(serializers.ModelSerializer):
  class Meta:
    model = Genre
    fields = ('id', 'name', 'slug')

# Основной сериализатор фильма использует минимальный жанр
class MovieSerializer(serializers.ModelSerializer):
  genres = GenreMinimalSerializer(many=True, read_only=True)

  class Meta:
    model = Movie
    fields = (
      'id', 'tmdb_id', 'content_type', 'title', 'slug',
      'year', 'duration_min', 'rating', 'description',
      'poster_url', 'genres', 'created_at', 'updated_at'
    )

# Сериализатор для лент главной страницы (вот он собирает фильмы)
class GenreLandingSerializer(serializers.ModelSerializer):
  movies = serializers.SerializerMethodField()

  class Meta:
    model = Genre
    fields = ('id', 'name', 'slug', 'movies')

  def get_movies(self, obj):
    movies = Movie.objects.filter(genres=obj).order_by('-year')[:15]
    return MovieSerializer(movies, many=True, context=self.context).data
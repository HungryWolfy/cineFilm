from rest_framework import serializers
from .models import Movie, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = (
            'id',
            'tmdb_genre_id',
            'name',
            'slug',
        )


class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = (
            'id',
            'tmdb_id',
            'content_type',
            'title',
            'slug',
            'year',
            'duration_min',
            'rating',
            'description',
            'poster_url',
            'genres',
            'created_at',
            'updated_at'
        )
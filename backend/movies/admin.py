from django.contrib import admin
from .models import Movie, Genre


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
  list_display = ("id", "name", "slug", "is_featured", 'sort_order')
  list_editable = ("is_featured", "sort_order")
  search_fields = ("name", "slug")
  prepopulated_fields = {"slug": ("name",)}


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
  list_display = ("id", "title", "year", "rating")
  list_filter = ("year", "genres")
  search_fields = ("title", "slug")
  prepopulated_fields = {"slug": ("title",)}
  filter_horizontal = ("genres",)

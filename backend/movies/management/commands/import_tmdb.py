import os
import requests

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils.text import slugify

from movies.models import Movie, Genre

TMDB_BASE_URL = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"


class Command(BaseCommand):
    help = "Import movies and TV shows from TMDB into local database"

    def add_arguments(self, parser):
        parser.add_argument("--pages", type=int, default=1,
                            help="How many pages to import for each type")
        parser.add_argument("--wipe", action="store_true",
                            help="Delete existing movies before import")

    def handle(self, *args, **options):
        api_key = os.getenv("TMDB_API_KEY") or getattr(settings, "TMDB_API_KEY",
                                                       None)
        language = os.getenv("TMDB_LANGUAGE") or getattr(settings,
                                                         "TMDB_LANGUAGE",
                                                         "en-US")
        pages = options["pages"]
        wipe = options["wipe"]

        if not api_key:
            raise RuntimeError(
                "TMDB_API_KEY is missing. Put it in backend/.env")

        if wipe:
            Movie.objects.all().delete()

        self.stdout.write(
            self.style.SUCCESS(f"Using TMDB language: {language}"))
        self._import_genres(api_key=api_key, language=language)

        self._import_titles(content_type="movie", api_key=api_key,
                            language=language, pages=pages)
        self._import_titles(content_type="tv", api_key=api_key,
                            language=language, pages=pages)

        self.stdout.write(self.style.SUCCESS("TMDB import finished."))

    def _tmdb_get(self, path, *, api_key, language, params=None):
        params = params or {}
        params.update({"api_key": api_key, "language": language})
        url = f"{TMDB_BASE_URL}{path}"
        r = requests.get(url, params=params, timeout=30)
        r.raise_for_status()
        return r.json()

    def _import_genres(self, *, api_key, language):
        movie_genres = self._tmdb_get("/genre/movie/list", api_key=api_key,
                                      language=language).get("genres", [])
        tv_genres = self._tmdb_get("/genre/tv/list", api_key=api_key,
                                   language=language).get("genres", [])
        merged = {g["id"]: g["name"] for g in (movie_genres + tv_genres)}

        for tmdb_genre_id, name in merged.items():
            slug = slugify(name)[:64]
            Genre.objects.update_or_create(
                tmdb_genre_id=tmdb_genre_id,
                defaults={
                    'name': name,
                    'slug': slug
                }
            )

        self.stdout.write(
            self.style.SUCCESS(f"Imported/updated genres: {len(merged)}"))

    def _import_titles(self, *, content_type, api_key, language, pages):
        # We'll import "popular". You can switch to "top_rated" later.
        endpoint = "/movie/popular" if content_type == "movie" else "/tv/popular"

        self.stdout.write(
            self.style.WARNING(f"Importing {content_type} pages={pages}..."))

        for page in range(1, pages + 1):
            data = self._tmdb_get(endpoint, api_key=api_key, language=language,
                                  params={"page": page})
            results = data.get("results", [])

            for item in results:
                tmdb_id = item["id"]
                title = item.get("title") or item.get("name") or ""
                overview = item.get("overview") or ""
                vote_average = item.get("vote_average")  # 0..10 float
                poster_path = item.get("poster_path")

                # year: movie uses release_date, tv uses first_air_date
                date_str = item.get(
                    "release_date") if content_type == "movie" else item.get(
                    "first_air_date")
                year = None
                if date_str and len(date_str) >= 4 and date_str[:4].isdigit():
                    year = int(date_str[:4])

                if not title or not year:
                    # Skip incomplete items to satisfy our model requirements (year is required)
                    continue

                poster_url = f"{TMDB_IMAGE_BASE}{poster_path}" if poster_path else ""

                movie_obj, created = Movie.objects.update_or_create(
                    tmdb_id=tmdb_id,
                    defaults={
                        "content_type": content_type,
                        "title": title,
                        "year": year,
                        "rating": vote_average,
                        "description": overview,
                        "poster_url": poster_url,
                        # slug will be generated by model save() if empty
                    },
                )

                # Set genres (many-to-many)
                genre_ids = item.get("genre_ids") or []
                if genre_ids:
                    genres = Genre.objects.filter(tmdb_genre_id__in=genre_ids)
                    movie_obj.genres.set(genres)
                else:
                    movie_obj.genres.clear()

            self.stdout.write(self.style.SUCCESS(
                f"{content_type}: imported page {page} ({len(results)} items)"))

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify


class Genre(models.Model):
    tmdb_genre_id = models.PositiveIntegerField(unique=True, null=True, blank=True, db_index=True)
    name = models.CharField(max_length=64, unique=True)
    slug = models.SlugField(max_length=64, unique=True, blank=True)

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    tmdb_id = models.PositiveBigIntegerField(unique=True, null=True, blank=True)
    content_type = models.CharField(
        max_length=10,
        choices=[('movie', 'Movie'), ('tv', 'TV')],
        default='movie'
    )

    year = models.PositiveSmallIntegerField()
    duration_min = models.PositiveSmallIntegerField(null=True, blank=True)

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
        help_text="Rating from 0.0 to 10.0",
    )

    description = models.TextField(blank=True)
    poster_url = models.URLField(max_length=500, blank=True)

    genres = models.ManyToManyField(Genre, related_name="movies", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-year", "title"]
        indexes = [
            models.Index(fields=["year"]),
            models.Index(fields=["title"]),
            models.Index(fields=["slug"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)[:240]
            candidate = base
            i = 1
            while Movie.objects.filter(slug=candidate).exclude(
                    pk=self.pk).exists():
                i += 1
                candidate = f"{base}-{i}"
            self.slug = candidate
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.title} ({self.year})"

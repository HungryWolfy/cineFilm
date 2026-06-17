import { useState, useEffect } from "react";
import { API_URL } from "@/shared/api/base.ts";
import { fetchJson } from "@/shared/api/http.ts";
import type { Movie } from "../model/types.ts";

export const useMoviesByGenre = (genre: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    // Делаем запрос к API с фильтрацией по жанру
    fetchJson(`${API_URL}/movies/?genre=${genre.toLowerCase()}`, { signal: controller.signal })
      .then((data) => {
        // Предполагаем, что API возвращает массив фильмов или объект с полем movies
        setMovies(Array.isArray(data) ? data : (data.results || []));
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [genre]);

  return { movies, isLoading, error };
};
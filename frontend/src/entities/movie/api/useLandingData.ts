import { useState, useEffect } from "react";
import { API_URL } from "@/shared/api/base.ts";
import { fetchJson } from "@/shared/api/http.ts";
import type { Movie } from "../model/types.ts";

export const useLandingData = () => {
  const [latest, setLatest] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    // Запрашиваем только то, что нужно для новинок
    fetchJson(`${API_URL}/movies/landing/`, { signal: controller.signal })
      .then((responseData: any) => {
        // Берем только latest, остальное игнорируем
        setLatest(responseData.latest || []);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  return { latest, isLoading, error };
};
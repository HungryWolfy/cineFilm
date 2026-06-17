import {useEffect, useState} from "react";
import {API_URL} from "@/shared/api/base.ts";
import {fetchJson} from "@/shared/api/http.ts";
import type {Movie} from "@/entities/movie/model/types.ts";
import MovieGrid from "@/widgets/MovieGrid/MovieGrid.tsx";
import Header from "@/widgets/Header";
import MovieCard from "@/entities/movie/ui/MovieCard.tsx";
import {getPaginationRange} from "@/shared/utils/pagination.ts";
import styles from './Catalog.module.scss';
import Footer from "@/widgets/Footer";


interface Genre {
  id: number;
  name: string;
  slug: string;
}

interface LandingDataResponse {
  latest: Movie[];
  genres_sections: GenreSection[];
  genres: Genre[];
}

interface GenreSection {
  id: number;
  name: string;
  slug: string;
  movies: Movie[];
}


interface GridDataResponse {
  count: number;
  results: Movie[];
}

const Catalog = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [landingData, setLandingData] = useState<LandingDataResponse | null>(null);
  const [gridMovies, setGridMovies] = useState<Movie[]>([]);

  // Синхронизиция размер страницы с бэкендом (в settings.py указано 15)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 15;

  // Запрос для Лендинга (Главная страница)
  useEffect(() => {
    if (selectedGenre) return;

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetchJson(`${API_URL}/movies/landing/`, {signal: controller.signal})
      .then((data) => {
        setLandingData(data as LandingDataResponse);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error(err);
        setError("Не удалось загрузить каталог");
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [selectedGenre]);

  // Запрос для Сетки с фильтрацией (Учитываем LimitOffsetPagination бэкенда)
  useEffect(() => {
    if (!selectedGenre) return;

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    // Очищаем старые фильмы, чтобы не было визуальных багов при переключении
    setGridMovies([]);

    // Высчитываем offset для Django LimitOffsetPagination
    const offset = (currentPage - 1) * pageSize;

    fetchJson(
      `${API_URL}/movies/?genre=${selectedGenre}&limit=${pageSize}&offset=${offset}`,
      {signal: controller.signal}
    )
      .then((data) => {
        const res = data as GridDataResponse;
        setGridMovies(res.results);
        setTotalCount(res.count);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error(err);
        setError("Ошибка при фильтрации");
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [selectedGenre, currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const handleGenreChange = (genreSlug: string | null) => {
    setSelectedGenre(genreSlug);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <section className={styles.catalog}>
        <div className="container">
          <h1 className={styles.title}>Catalogue</h1>
          <h2 className={`${styles.subtitle} h3`}>Filters</h2>
          {/* Фильтры */}
          <div className={styles.filterBadges}>
            <button
              onClick={() => handleGenreChange(null)}
              className={!selectedGenre ? styles.activeBadge : ''}
            >
              Все
            </button>

            {landingData?.genres.map(section => (
              <button
                key={section.id}
                onClick={() => handleGenreChange(section.slug)}
                // ИСПРАВЛЕНО: Теперь класс динамически переключается для каждого жанра
                className={selectedGenre === section.slug ? styles.activeBadge : ''}
              >
                {section.name}
              </button>
            ))}
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}
          {isLoading && <div className={styles.loader}>Загрузка...</div>}

          {!error && (
            !selectedGenre ? (
              <div className={styles.landingView}>
                {landingData && (
                  <>
                    <MovieGrid
                      movies={landingData.latest}
                      title="New and anticipated"
                    />
                    {landingData.genres_sections.map((section) => (
                      <MovieGrid
                        key={section.id}
                        movies={section.movies}
                        title={section.name}
                      />
                    ))}
                  </>
                )}
              </div>
            ) : (
              // Режим сетки
              <div className={styles.gridView}>
                <h2 className={styles.categoryTitle}>Результаты поиска:</h2>

                {!isLoading && gridMovies.length === 0 && (
                  <div className={styles.emptyMessage}>В этом жанре пока нет фильмов</div>
                )}

                <ul className={styles.catalogGrid}>
                  {gridMovies.map(movie => (
                    <li
                      key={movie.id}
                      className={styles.gridItem}
                    >
                      <MovieCard movie={movie} />
                    </li>
                  ))}
                </ul>

                {/* Пагинация */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <button
                      disabled={currentPage === 1 || isLoading}
                      onClick={() => setCurrentPage(p => p - 1)}
                    >
                      Назад
                    </button>

                    {paginationRange.map((pageNumber, idx) => (
                      pageNumber === '...'
                        ? <span
                          key={idx}
                          className={styles.dots}
                        >&hellip;</span>
                        : <button
                          key={idx}
                          disabled={isLoading}
                          className={currentPage === pageNumber ? styles.activePage : ''}
                          onClick={() => setCurrentPage(Number(pageNumber))}
                        >
                          {pageNumber}
                        </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages || isLoading}
                      onClick={() => setCurrentPage(p => p + 1)}
                    >
                      Вперед
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Catalog;
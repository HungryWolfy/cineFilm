import type {Movie} from "@/entities/movie/model/types.ts";
import MovieCard from "@/entities/movie/ui/MovieCard.tsx";
import ArrowRight from '@/shared/assets/icons/movieGrid/arrow.svg?react';
import styles from './MovieGrid.module.scss'
import {useState} from "react";

type MovieGridProps = {
  movies: Movie[],
  title: string
}

const MovieGrid = (props: MovieGridProps) => {
  const {movies, title} = props

  const [page, setPage] = useState(0)

  const perPage = 5
  const totalPages = Math.ceil(movies.length / perPage)
  const visibleMovies = movies
    .slice(page * perPage, page * perPage + perPage)

  const handleNext = () => {
    setPage((prevPage) => {
      if (prevPage >= totalPages - 1) {
        return 0
      } else {
        return prevPage + 1
      }
    })
  }

  return (
    <div className={styles.gridContainer}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.gridBody}>
        <ul className={styles.moviesGrid}>
          {
            visibleMovies.map((movie) => {
              return <li
                key={movie.id}
                className={styles.movieItem}
              >
                <MovieCard movie={movie} />
              </li>
            })
          }
        </ul>
        <button
          className={styles.button} type={"button"} onClick={handleNext}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}

export default MovieGrid
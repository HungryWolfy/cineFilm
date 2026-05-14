import type {Movie} from "../../entities/movie/model/types.ts";
import MovieCard from "../../entities/movie/ui/MovieCard.tsx";
import styles from './MovieGrid.module.scss'

type MovieGridProps = {
  movies: Movie[]
}

const MovieGrid = ({movies}: MovieGridProps) => {

  // console.log(movies)

  return (
    <div className="container">
      <ul className={styles.moviesGrid}>
        {
          movies.map((movie) => {
            return <li key={movie.id} className={styles.movieItem}>
              <MovieCard movie={movie}/>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default MovieGrid
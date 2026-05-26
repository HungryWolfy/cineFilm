import styles from './MovieCard.module.scss'
import {Link} from "react-router-dom";
import type {Movie} from "../model/types.ts";

type Props = {
  movie: Movie
}

const MovieCard = ({movie}: Props) => {
  const genresText = Array.isArray(movie.genres)
    ? movie.genres.map(g => g.name).join(', ')
    : ''

  return (
    <>
      <Link
        to={`/movie/${movie.id}`}
        className={styles.movieLink}
      >
        <img
          src={movie.poster_url}
          alt="movie"
          width="200"
          height="300"
          loading="lazy"
          className={styles.movieImg}
        />

        <div className={styles.movieBody}>
          <h5 className={styles.movieTitle}>{movie.title}</h5>
          <div className={styles.movieInfo}>
            <span className={styles.movieYear}>{`${movie.year}, `}</span>
            <span className={styles.movieGenres}>{genresText}</span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default MovieCard
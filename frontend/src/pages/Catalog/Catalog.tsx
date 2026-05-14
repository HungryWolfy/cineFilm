import {useEffect, useState} from "react";
import {API_URL} from "../../shared/api/base.ts";
import {fetchJson} from "../../shared/api/http.ts";
import type {Movie} from "../../entities/movie/model/types.ts";
import MovieGrid from "../../widgets/MovieGrid/MovieGrid.tsx";

const Catalog = () => {

  const [movies, setMovies] = useState<Movie[]>([])
  // const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchJson(`${API_URL}/movies`, {
      signal: controller.signal
    })
      .then((data) => {
        setMovies(data as Movie[])
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        console.error(error)
      })
  }, [])

  // console.log(movies)

  return (
    <div>
      <h1>Catalog</h1>
      <MovieGrid movies={movies} />
    </div>
  )
}

export default Catalog
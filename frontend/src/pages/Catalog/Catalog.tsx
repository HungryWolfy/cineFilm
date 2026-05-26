import {useEffect, useState} from "react";
import {API_URL} from "@/shared/api/base.ts";
import {fetchJson} from "@/shared/api/http.ts";
import type {Movie} from "@/entities/movie/model/types.ts";
import MovieGrid from "@/widgets/MovieGrid/MovieGrid.tsx";
import Header from "@/widgets/Header";

const Catalog = () => {

  const [movies, setMovies] = useState<Movie[]>([])
  // const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchJson(`${API_URL}/movies?limit=15`, {
      signal: controller.signal
    })
      .then((data) => {
        setMovies(data.results as Movie[])
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        console.error(error)
      })
  }, [])

  // console.log(movies)

  return (
    <div>
      <Header isAuth={true} />
      <h1>Catalog</h1>
      <MovieGrid movies={movies} title={'New'}/>
    </div>
  )
}

export default Catalog
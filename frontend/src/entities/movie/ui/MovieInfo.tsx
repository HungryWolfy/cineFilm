import {useParams} from "react-router-dom";

const MovieInfo = () => {
  const {id} = useParams()

  return (
    <div>
      {`Фильм с id: ${id}`}
    </div>
  )
}

export default MovieInfo
import Header from "@/widgets/Header/Header";
import Hero from "@/widgets/Hero";
import Footer from "@/widgets/Footer";
import MovieGrid from "@/widgets/MovieGrid/MovieGrid.tsx";
import {useLandingData} from "@/entities/movie/api/useLandingData.ts";
import {useMoviesByGenre} from "@/entities/movie/api/useMoviesByGenre.ts"; // Твой новый хук
import Receive from "@/widgets/Receive";
import Questions from "@/widgets/Questions";
import useAuth from "@/shared/hooks/useAuth.ts";

const Home = () => {
  const {latest} = useLandingData();
  const {movies: actionMovies} = useMoviesByGenre('action');
  const {movies: crimeMovies} = useMoviesByGenre('crime');
  const {user} = useAuth();

  return (
    <>
      <Header />
      <main className="main">
        <Hero/>
        <div className="container">
          {user !== null ? (
            <>
              {latest.length > 0 && <MovieGrid
                movies={latest}
                title="New movies"
              />}

              <MovieGrid
                movies={actionMovies}
                title="Action"
              />
              <MovieGrid
                movies={crimeMovies}
                title="Crime"
              />

            </>
          ) : (
            <>
              <Receive />
              <Questions />
            </>
          )}
        </div>


      </main>
      <Footer />
    </>
  );
};

export default Home;
import {Routes, Route} from "react-router-dom";
import Catalog from "../../pages/Catalog";
import Page0 from "../../pages/page0";
import MovieInfo from "../../entities/movie/ui/MovieInfo.tsx";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Page0 />}
      />
      <Route
        path="/catalog"
        element={<Catalog />}
      />
      <Route
        path="/movie/:id"
        element={<MovieInfo />}
      />
    </Routes>
  )
}

export default AppRouter;
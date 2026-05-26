import {Routes, Route} from "react-router-dom";
import Catalog from "@/pages/Catalog";
import MovieInfo from "@/entities/movie/ui/MovieInfo.tsx";
import Home from "@/pages/Home";
import Register from "@/pages/register";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home/>}
      />
      <Route
        path="/catalog"
        element={<Catalog />}
      />
      <Route
        path="/movie/:id"
        element={<MovieInfo />}
      />
      <Route
      path="/register"
      element={<Register/>}
      />
    </Routes>
  )
}

export default AppRouter;
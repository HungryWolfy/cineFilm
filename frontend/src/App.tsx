import Providers from "./app/providers";
import AppRouter from "./app/Router/AppRouter.tsx";
import {Link} from "react-router-dom";


function App() {
  return (
    <Providers>
      <div className="app">
        <AppRouter />
        <Link to="/catalog">Catalog</Link>
      </div>
    </Providers>
  )
}

export default App

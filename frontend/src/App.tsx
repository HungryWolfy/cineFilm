import Providers from "./app/providers";
import AppRouter from "./app/Router/AppRouter.tsx";

function App() {
  return (
    <Providers>
      <div className="app">
        <AppRouter />
      </div>
    </Providers>
  )
}

export default App

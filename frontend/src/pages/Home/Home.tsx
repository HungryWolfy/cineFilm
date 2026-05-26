import Header from "@/widgets/Header/Header";
import Hero from "@/widgets/Hero";

const isAuth = false

const Home = () => {
  return (
    <>
      <Header isAuth={isAuth} />
      <main className="main">
        <Hero/>
      </main>
    </>
  )
}

export default Home
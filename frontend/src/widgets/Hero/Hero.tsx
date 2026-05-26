import {useNavigate} from "react-router-dom";
import Button from "@/widgets/Button";
import styles from './Hero.module.scss'


const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.main}>
          <div className={styles.body}>
            <h1 className={`${styles.title}`}>
              A large number of films, TV series,<br /> sports broadcasts and much more
            </h1>

            <form
              className={styles.form}
              action="/"
            >
              <div className={styles.formBody}>
                <div className={styles.inputWrapper}>
                  <label
                    htmlFor="hero-email"
                    className={styles.label}
                  >Email
                  </label>
                  <input
                    id="hero-email"
                    className={styles.input}
                    type="email"
                    placeholder="E-mail"
                    required
                  />
                </div>
                <Button
                  onClick={() => navigate('/register')}
                  className={styles.button}
                >Get started</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
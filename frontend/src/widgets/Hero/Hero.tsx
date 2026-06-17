import {useNavigate} from "react-router-dom";
import Button from "@/widgets/Button";
import useAuth from "@/shared/hooks/useAuth.ts";
import starImg from '@/shared/assets/images/hero/stars.png'
import StartStopIcon from '@/shared/assets/icons/hero/start&stop.svg?react'
import styles from './Hero.module.scss'


const Hero = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.main}>
          {/*
          Не успел реализовать, чтобы отображались актуальные данные фильма/сериала из базы данных.
          Вставил временно статичный данные.
          */}
          {user !== null ? (
            <div className={styles.userAuthContainer}>
              <div className={styles.movieInfo}>
                <h1 className={styles.movieName}>Vikings</h1>
                <img
                  className={styles.movieRating}
                  src={starImg}
                  alt="rating"
                />
                <p className={styles.movieDescription}>
                  The series Vikings tells the story of a short period in the early Middle Ages, which tells the story
                  of
                  the confrontation between the young Christian kingdoms of the West and the Scandinavian tribes.
                </p>
                <p className={styles.movieGenre}>
                  <span>Genre:</span>
                  History, drama, action, melodrama, adventure
                </p>
                <p className={styles.movieDuration}>
                  <span>Series duration:</span>
                  45 minutes
                </p>
                <Button className={styles.startWatchingButton}>Start watching</Button>
              </div>
              <div className={styles.startWatching}>
                <a
                  className={styles.linkMovie}
                  href="/"
                >
                  <StartStopIcon className={styles.startStopLink}/>
                  Watch trailer
                </a>
              </div>
            </div>
          ) : (
            <div className={styles.body}>
              <h1 className={`${styles.title}`}>
                A large number of films, TV series,<br /> sports broadcasts and
                much more
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
          )}

        </div>
      </div>
    </section>
  )
}

export default Hero;
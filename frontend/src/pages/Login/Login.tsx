import Input from "@/widgets/Input";
import Button from "@/widgets/Button";
import styles from "@/pages/Login/Login.module.scss";
import {useState} from "react";
import * as React from "react";
import Header from "@/widgets/Header";
import useAuth from "@/shared/hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const {fetchMe} = useAuth()

  const url = import.meta.env.VITE_API_URL

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(`${url}/api/login/`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({login, password}),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      await fetchMe()

      navigate('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Header />
      <section className={`${styles.login} container`}>
        <div className={styles.loginBody}>
          <h1 className={`${styles.title} title-primary`}>
            Enter CineFilm
          </h1>
          <form
            action=""
            method="post"
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.formBody}>
              <Input
                type="text"
                placeholder="E-mail/login"
                required={true}
                onChange={(e) => setLogin(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/*{message && <div>{message}</div>}*/}
            </div>
            <div className={styles.formAction}>
              <Button
                type={"submit"}
                className={styles.button}
              >Next</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}


export default Login
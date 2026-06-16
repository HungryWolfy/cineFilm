import * as React from "react";
import {useState} from "react";
import Input from "@/widgets/Input";
import Button from "@/widgets/Button";
import Checkbox from "@/widgets/Checkbox";
import styles from './Register.module.scss'
import {useNavigate} from "react-router-dom";

// type RegisterResponse = {
//   success: boolean,
//   message?: string,
//   error?: string,
// }

const Register = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const url = import.meta.env.VITE_API_URL

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    try {
      const response = await fetch(`${url}/api/register/`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({login, email, password}),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      if (data.success) {
        setMessage('Register success')
      } else {
        setMessage('Register failed')
      }

      if (data.success) {
        navigate('/login')
      }


    } catch (error: any) {
      setMessage(error.message)
    }
  }

  return (
    <section className={`${styles.register} container`}>
      <div className={styles.registerBody}>
        <h1 className={`${styles.title} title-primary`}>
          Creating a CineFilm profile
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
              placeholder="Login"
              required={true}
              onChange={(e) => setLogin(e.target.value)}
            />
            <Input
              type="email"
              placeholder="E-mail"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            {message && <div>{message}</div>}
          </div>
          <div className={styles.formAction}>
            <Button
              type={"submit"}
              className={styles.button}
            >Create</Button>
            <Checkbox className={styles.checkbox}>Special offer from CineFilm</Checkbox>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register
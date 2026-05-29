import * as React from "react";
import {useState} from "react";
import axios from 'axios';
import Input from "@/widgets/Input";
import Button from "@/widgets/Button";
import Checkbox from "@/widgets/Checkbox";
import styles from './Register.module.scss'

type RegisterResponse = {
  success: boolean,
  message?: string,
  error?: string,
}

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    try {
      const res =
        await axios.post<RegisterResponse>(`${import.meta.env.VITE_API_URL}/api/register/`,
          {email, password},
          {headers: {"Content-Type": "application/json"}}
        )

      if (res.data.success) {
        setMessage(res.data.message || 'Registration successful');
      } else {
        setMessage(res.data.error || 'Registration failed');
      }

    } catch (err: any) {
      if (err.response?.data?.error) {
        setMessage(err.response.data.error)
      } else {
        setMessage('Error. Try again')
      }
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
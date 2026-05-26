import Input from "@/widgets/Input";
import Button from "@/widgets/Button";
import Checkbox from "@/widgets/Checkbox";
import styles from './Register.module.scss'


const Register = () => {
  return (
    <section className={`${styles.register} container`}>
      <div className={styles.registerBody}>
        <h1 className={`${styles.title} title-primary`}>
          Creating a CineFilm profile
        </h1>
        <form
          action="/"
          className={styles.form}
        >
          <div className={styles.formBody}>
            <Input
              type="email"
              placeholder="E-mail"
              required={true}
            />
            <Input
              type="password"
              placeholder="Password"
              required={true}
            />
          </div>
          <div className={styles.formAction}>
            <Button className={styles.button}>Create</Button>
            <Checkbox className={styles.checkbox}>Special offer from CineFilm</Checkbox>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register
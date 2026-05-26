import styles from './Input.module.scss'

type InputProps = {
  className?: string,
  type?: string,
  placeholder?: string,
  required?: boolean
}

const Input = (props: InputProps) => {
  const {type, placeholder, className, required} = props

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${className}`}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </>
  )
}

export default Input
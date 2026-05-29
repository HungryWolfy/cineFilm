import styles from './Input.module.scss'
import type {ChangeEvent} from "react";

type InputProps = {
  className?: string,
  type?: string,
  placeholder?: string,
  required?: boolean,
  value?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {
  const {type, placeholder, className, required, ...rest} = props

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${className}`}
          type={type}
          placeholder={placeholder}
          required={required}
          {...rest}
        />
      </div>
    </>
  )
}

export default Input
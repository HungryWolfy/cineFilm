import * as React from "react";
import styles from './Checkbox.module.scss'

type CheckboxProps = {
  className?: string,
  labelClassName?: string,
  checked?: boolean,
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
  id?: string,
  children?: React.ReactNode
}

const Checkbox = (props: CheckboxProps) => {
  const {
    className,
    labelClassName,
    checked,
    onChange,
    id,
    children,
  } = props

  const autoId = React.useId()
  const inputId = id || autoId

  return (
    <div className={styles.checkboxContainer}>
      <label
        className={`${styles.label} ${labelClassName}`}
        htmlFor={inputId}
      >
        <input
          id={inputId}
          className={styles.checkbox}
          type="checkbox"
          checked={checked}
          onChange={
            (event) => onChange?.(event.target.checked, event)}
        />
        <span className={`${styles.customCheckbox} ${className}`}></span>
        {children}
      </label>
    </div>
  )
}

export default Checkbox
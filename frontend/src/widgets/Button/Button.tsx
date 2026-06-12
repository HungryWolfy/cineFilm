import styles from './Button.module.scss'

type Props = {
  children?: React.ReactNode,
  iconLeft?: React.ReactNode,
  iconRight?: React.ReactNode,
  type?: 'button' | 'submit' | 'reset',
  className?: string,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button(props: Props) {
  const {children, iconLeft, iconRight, type, className, ...rest} = props

  return (
    <button
      type={type ?? 'button'}
      className={`${styles.button} ${className}`}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}

export default Button;
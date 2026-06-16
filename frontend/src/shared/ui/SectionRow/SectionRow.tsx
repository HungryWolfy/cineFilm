import styles from './SectionRow.module.scss'

type sectionRowProps = {
  children?: React.ReactNode,
  className?: string,
  hasTopLine?: boolean,
  hasBottomLine?: boolean,
}

const SectionRow = (
  {
    children,
    className,
    hasTopLine = false,
    hasBottomLine = false,
  }: sectionRowProps) => {

  const rootClasses = [
    styles.section,
    hasTopLine ? styles.hasTopLine : '',
    hasBottomLine ? styles.hasBottomLine : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <section className={rootClasses}>
      <div className="container">
        {children}
      </div>
    </section>
  )
}

export default SectionRow
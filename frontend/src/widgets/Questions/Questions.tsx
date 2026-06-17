import SectionRow from "@/shared/ui/SectionRow";
import styles from './Questions.module.scss'

const Questions = () => {
  return (
    <section className={styles.receive}>
      <div className="container">
        <div className={styles.main}>
          <div className={styles.body}>
            <h2 className={styles.title}>
              Frequently asked questions
            </h2>
          </div>
        </div>
      </div>
      <SectionRow
        hasBottomLine
        hasTopLine
      >
        <div className={styles.receiveContent}>
          <h2 className={`${styles.receiveTitle} h3`}>What is CineFilm?</h2>
          <div className={styles.plus}></div>
        </div>
      </SectionRow>
      <SectionRow hasBottomLine>
        <div className={styles.receiveContent}>
          <h2 className={`${styles.receiveTitle} h3`}>What sports events and leagues are available on CineFilm?</h2>
          <div className={styles.plus}></div>
        </div>
      </SectionRow>
      <SectionRow hasBottomLine>
        <div className={styles.receiveContent}>
          <h2 className={`${styles.receiveTitle} h3`}>How much does CineFilm cost?</h2>
          <div className={styles.plus}></div>
        </div>
      </SectionRow>
      <SectionRow hasBottomLine>
        <div className={styles.receiveContent}>
          <h2 className={`${styles.receiveTitle} h3`}>Where to look?</h2>
          <div className={styles.plus}></div>
        </div>
      </SectionRow>
    </section>
  );
};

export default Questions;
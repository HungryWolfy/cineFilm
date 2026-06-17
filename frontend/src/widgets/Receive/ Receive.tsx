import tvImg from '@/shared/assets/images/receive/TV.png'
import styles from './Receive.module.scss'

const Receive = () => {
  return (
    <section className={styles.receive}>
      <div className="container">
        <div className={styles.main}>
          <div className={styles.body}>
            <h2 className={styles.title}>
              By creating a profile, you <br/> will receive :
            </h2>
            <ul className={styles.receiveList}>
              <li className={styles.receiveItem}>
                Wide range of content
              </li>
              <li className={styles.receiveItem}>
                Viewable on a variety of devices
              </li>
              <li className={styles.receiveItem}>
                Downloadable content
              </li>
              <li className={styles.receiveItem}>
                3 films and TV series free of charge
              </li>
              <li className={styles.receiveItem}>
                7 days free usage
              </li>
            </ul>
          </div>
          <img
            className={styles.img}
            src={tvImg}
            alt="TV"
            width="687"
            height="388"
          />
        </div>
      </div>
    </section>
  );
};

export default Receive;
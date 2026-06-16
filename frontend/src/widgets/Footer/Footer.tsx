import TelegramIcon from '@/shared/assets/icons/footer/telegram.svg?react'
import FacebookIcon from '@/shared/assets/icons/footer/facebook.svg?react'
import XIcon from '@/shared/assets/icons/footer/x.svg?react'
import styles from "./Footer.module.scss";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerInner}>
          <div className={styles.userAndPartners}>
            <h3 className={styles.title}>
              To users and partners
            </h3>
            <ul className={`${styles.userAndPartnersList} ${styles.listStyle}`}>
              <li className={styles.userAndPartnersitem}>
                <a className={styles.linkItem} href="/">
                About us
                </a>
              </li>
              <li className={styles.userAndPartnersitem}>
                <a className={styles.linkItem} href="/">
                All about subscriptions
                </a>
              </li>
              <li className={styles.userAndPartnersitem}>
                <a className={styles.linkItem} href="/">
                Activate promo code
                </a>
              </li>
              <li className={styles.userAndPartnersitem}>
                <a className={styles.linkItem} href="/">
                For investors
                </a>
              </li>
              <li className={styles.userAndPartnersitem}>
                <a className={styles.linkItem} href="/">
                User Agreement
                </a>
              </li>
              <li className={styles.userAndPartnersitem}>
                <a className={styles.linkItem} href="/">
                Delete profile
                </a>
              </li>
              <li className={styles.userAndPartnersitem}>
                <a className={styles.linkItem} href="/">
                Cooperation
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.devices}>
            <h3 className={styles.title}>
              Devices
            </h3>
            <ul className={`${styles.devicesList} ${styles.listStyle}`}>
              <li className={styles.devicesItem}>
                <a className={styles.linkItem} href="/">
                TVs
                </a>
              </li>
              <li className={styles.devicesItem}>
                <a className={styles.linkItem} href="/">
                Mobile devices
                </a>
              </li>
              <li className={styles.devicesItem}>
                <a className={styles.linkItem} href="/">
                Computers
                </a>
              </li>
              <li className={styles.devicesItem}>
                <a className={styles.linkItem} href="/">
                Connect TV
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.socialMedia}>
            <h3 className={styles.title}>We're on social media</h3>
            <ul className={`${styles.socialMediaList} ${styles.listStyle}`}>
              <li className={styles.socialMediaItem}>
                <a className={styles.socialMediaLink} href="/">
                  <TelegramIcon />
                </a>
              </li>
              <a className={styles.socialMediaLink} href="/">
                <FacebookIcon />
              </a>
              <li className={styles.socialMediaItem}>
                <a className={styles.socialMediaLink} href="/">
                  <XIcon />
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.support}>
            <h3 className={styles.title}>
              Support
            </h3>
            <div className={styles.supportBody}>
              <a className={styles.mailSupport} href="mailto:support@cinefilm.net">support@cinefilm.net</a>
              <h3 className={styles.subtitleSupport}>Any questions? Ask away</h3>
              <input className={styles.inputSupport} placeholder="Write here" type="text" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
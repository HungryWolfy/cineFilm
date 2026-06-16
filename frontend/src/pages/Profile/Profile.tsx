import Button from "@/widgets/Button";
import useAuth from '@/shared/hooks/useAuth.ts';
import {useNavigate} from 'react-router-dom';
import {useRef} from "react";
import SectionRow from "@/shared/ui/SectionRow";
import HistoryIcon from '@/shared/assets/icons/profile/history.svg?react';
import SupportIcon from '@/shared/assets/icons/profile/support.svg?react';
import FavoritesIcon from '@/shared/assets/icons/profile/favorites.svg?react';
import NotificationsIcon from '@/shared/assets/icons/profile/notifications.svg?react';
import styles from './Profile.module.scss';
import Footer from "@/widgets/Footer";
import Header from "@/widgets/Header";

const Profile = () => {
  const {user, logout, loading} = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    console.log(file)
  }


  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className={styles.profilePage}>
        <div className={styles.userContainer}>
          <div className={`${styles.userBody} container`}>
            <div className={styles.userInfo}>
              <div
                className={styles.userAvatar}
                onClick={handleAvatarClick}
              >
                {user.profile.avatar ? (
                  <img
                    src={user.profile.avatar}
                    alt={user.username}
                  />
                ) : (
                  ''
                )}

                <div className={styles.overlay}>
                  Change photo
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
              <h1 className={styles.username}>{user.username}</h1>
            </div>
            <menu className={styles.menuAction}>
              <ul className={styles.actionList}>
                <li className={styles.actionItem}>
                  <a href="/" className={styles.actionLink}>
                    <span>Activity history</span>
                    <span className={styles.actionIcon}><HistoryIcon /></span>
                  </a>
                </li>
                <li className={styles.actionItem}>
                  <a href="/" className={styles.actionLink}>
                    <span>Support and assistance</span>
                    <span className={styles.actionIcon}><SupportIcon /></span>
                  </a>
                </li>
                <li className={styles.actionItem}>
                  <a href="/" className={styles.actionLink}>
                    <span>Favorites</span>
                    <span className={styles.actionIcon}><FavoritesIcon /></span>
                  </a>
                </li>
                <li className={styles.actionItem}>
                  <a href="/" className={styles.actionLink}>
                    <span>System notifications</span>
                    <span className={styles.actionIcon}><NotificationsIcon /></span>
                  </a>
                </li>
              </ul>
            </menu>
          </div>
        </div>
        <SectionRow hasTopLine hasBottomLine className={styles.billing}>
          <h2 className={`${styles.titleBilling} h3`}>Subscription and payment:</h2>
          <div className={styles.billingContent}>
            <ul className={styles.mainDetailsList}>
              <li className={styles.detailsItem}>
                <div className={styles.detailsItemData}>
                  <h3 className={`${styles.subtitleDetails} h4`}>
                    Password:
                  </h3>
                </div>
                <button className={styles.actionButton}>Change Password</button>
              </li>
              <li className={styles.detailsItem}>
                <div className={styles.detailsItemData}>
                  <h3 className={`${styles.subtitleDetails} h4`}>
                    Payment method :
                  </h3>
                </div>
                <button className={styles.actionButton}>Change payment method</button>
              </li>
            </ul>

            <ul className={styles.extraActionList}>
              <li>
                <button className={styles.actionButton}>Change your email address</button>
              </li>
              <li>
                <button className={styles.actionButton}>Add phone number</button>
              </li>
            </ul>
          </div>
        </SectionRow>
        <SectionRow hasBottomLine>
          <h2 className={`${styles.titlePlan} h3`}>Plan conditions:</h2>
          <div className={styles.planContent}>
            <div className={styles.contentInner}>
              <h3 className={`${styles.planName} h4`}>Premium plan:</h3>
              <ul className={styles.featuresList}>
                <li className={styles.featuresItem}>
                  Price per month - 10.99$ +32 days as a gift
                </li>
                <li className={styles.featuresItem}>
                  Video quality - best
                </li>
                <li className={styles.featuresItem}>
                  Resolution capacity - 4k+HDR
                </li>
              </ul>
            </div>
            <button className={styles.actionButton}>Change the plan</button>
          </div>

        </SectionRow>
        <SectionRow hasBottomLine>
          <div className={styles.supportContent}>
            <h2 className={`${styles.supportTitle} h3`}>Support and assistance</h2>
            <div className={styles.plus}></div>
          </div>
        </SectionRow>
        <SectionRow hasBottomLine>
          <Button onClick={handleLogout}>Log Out</Button>
        </SectionRow>
        <Footer />
      </main>
    </>
  )
}

export default Profile
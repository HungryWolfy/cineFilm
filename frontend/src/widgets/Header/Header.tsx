import {Link, useNavigate} from "react-router-dom";
import Button from "@/widgets/Button";
import Logo from "@/shared/ui/Logo";
import SearchIcon from '@/shared/assets/icons/header/search.svg?react'
import UserDefaultIcon from '@/shared/assets/icons/user-default.svg?react'
import styles from './Header.module.scss'
import useAuth from "@/shared/hooks/useAuth.ts";

function Header() {
  const navigate = useNavigate()
  const {user} = useAuth()

  return (
    <header className={`${styles.header} container`}>
      <div className={styles.inner}>
        <Logo />
        <nav className={styles.menu}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to={"/"}>
                Home
              </Link>
            </li>
            <li className={styles.item}>
              <Link to={"/"}>
                Novelties
              </Link>
            </li>
            <li className={styles.item}>
              <Link to={"/"}>
                Series
              </Link>
            </li>
            <li className={styles.item}>
              <Link to={"/"}>
                Movies
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/catalog">
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.actions}>
          {user !== null
            ? (
              <>
                <button
                  className={styles.searchButton}
                  type={"button"}
                  aria-label={'Search'}
                >
                  <SearchIcon
                    width={22}
                    height={20}
                  />
                </button>
                <Link
                  to={'/profile'}
                  className={styles.profileLink}
                  aria-label={'Profile'}
                >
                  <UserDefaultIcon
                    width={32}
                    height={32}
                  />
                </Link>
              </>
            )
            : (<Button onClick={() => navigate('/login')}>Log in</Button>)
          }
        </div>
      </div>
    </header>
  )
}

export default Header;
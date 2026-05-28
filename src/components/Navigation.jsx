import { NavLink } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import styles from './Navigation.module.css';

function Navigation() {
  const { favorites } = useFavorites();

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <h2>🛍️ Shop</h2>
        </div>
        <div className={styles.navLinks}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Главная
          </NavLink>
          <NavLink 
            to="/list" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Товары
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            О нас
          </NavLink>
          <div className={styles.favoritesBadge}>
            🖤 {favorites.length}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
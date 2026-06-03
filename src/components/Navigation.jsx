import { NavLink, useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navigation.module.css';

function Navigation() {
  const { favorites } = useFavorites();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            to="/favourites" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            ❤️ Избранное ({favorites.length})
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            О нас
          </NavLink>
          
          <div className={styles.authSection}>
            {isAuthenticated ? (
              <>
                <span className={styles.userName}>
                  👤 {user?.name || user?.email || 'Пользователь'}
                </span>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Выйти
                </button>
              </>
            ) : (
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Войти
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
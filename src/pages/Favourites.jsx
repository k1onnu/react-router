import { useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import styles from './Favourites.module.css';

function Favourites() {
  const { favorites, removeFromFavorites } = useFavorites();

  const totalPrice = useMemo(() => {
    return favorites.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }, [favorites]);

  const handleRemove = useCallback((id) => {
    removeFromFavorites(id);
  }, [removeFromFavorites]);

  if (favorites.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>❤️ Избранное пусто</h2>
        <p>Добавьте товары в избранное на странице товаров</p>
        <NavLink to="/list" className={styles.shopLink}>Перейти к товарам</NavLink>
      </div>
    );
  }

  return (
    <div className={styles.favourites}>
      <h1 className={styles.title}>Моё избранное</h1>
      
      {/* Метаинформация - общая статистика */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Всего товаров:</span>
          <span className={styles.statValue}>{favorites.length}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Общая стоимость:</span>
          <span className={styles.statValue}>${totalPrice}</span>
        </div>
      </div>

      <div className={styles.grid}>
        {favorites.map(product => (
          <div key={product.id} className={styles.card}>
            <img 
              src={product.image} 
              alt={product.title} 
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.content}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <div className={styles.meta}>
                <span className={styles.price}>${product.price}</span>
                <span className={styles.category}>{product.category}</span>
                <span className={styles.quantity}>Количество: 1</span>
              </div>
              <button 
                onClick={() => handleRemove(product.id)}
                className={styles.removeButton}
              >
                🗑️ Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
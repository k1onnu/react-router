import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { api } from '../services/api';
import { useFavorites } from '../contexts/FavoritesContext';
import styles from './Details.module.css';

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await api.getProductById(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  if (loading) return <Loader />;
  
  if (error) return (
    <div className={styles.error}>
      <h2>Ошибка</h2>
      <p>{error}</p>
      <button onClick={loadProduct} className={styles.retryButton}>
        Попробовать снова
      </button>
    </div>
  );

  if (!product) return null;

  return (
    <div className={styles.details}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.meta}>
          <span className={styles.price}>${product.price}</span>
          <span className={styles.category}>{product.category}</span>
          <span className={styles.rating}>
            ⭐ {product.rating?.rate} ({product.rating?.count} отзывов)
          </span>
        </div>
        <div className={styles.description}>
          <h3>Описание:</h3>
          <p>{product.description}</p>
        </div>
        <button 
          onClick={handleFavoriteToggle}
          className={`${styles.favoriteButton} ${isFavorite(product.id) ? styles.active : ''}`}
        >
          {isFavorite(product.id) ? '🖤 В избранном' : '🤍 Добавить в избранное'}
        </button>
      </div>
    </div>
  );
}

export default Details;
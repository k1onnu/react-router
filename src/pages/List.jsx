import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { api } from '../services/api';
import styles from './List.module.css';

function List() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  
  if (error) return (
    <div className={styles.error}>
      <h2>Ошибка</h2>
      <p>{error}</p>
      <button onClick={loadProducts} className={styles.retryButton}>
        Попробовать снова
      </button>
    </div>
  );

  return (
    <div className={styles.list}>
      <h1 className={styles.title}>Наши товары</h1>
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default List;
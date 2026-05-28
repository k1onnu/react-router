import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img 
        src={product.image} 
        alt={product.title} 
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description.substring(0, 100)}...</p>
        <div className={styles.meta}>
          <span className={styles.price}>${product.price}</span>
          <span className={styles.category}>{product.category}</span>
        </div>
        <Link to={`/list/${product.id}`} className={styles.button}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
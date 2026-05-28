import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Добро пожаловать в наш магазин!</h1>
        <p className={styles.subtitle}>
          Лучшие товары по лучшим ценам
        </p>
      </div>
      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.icon}>🚚</div>
          <h3>Бесплатная доставка</h3>
          <p>При заказе от 5000₽</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>🔄</div>
          <h3>Возврат товара</h3>
          <p>30 дней на возврат</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>💳</div>
          <h3>Оплата онлайн</h3>
          <p>Безопасная оплата</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
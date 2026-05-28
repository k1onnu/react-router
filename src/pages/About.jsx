import styles from './About.module.css';

function About() {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>О нас</h1>
      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Кто мы?</h2>
          <p>
            Мы — современный интернет-магазин, который заботится о своих клиентах.
            Наша миссия — предоставлять качественные товары по доступным ценам.
          </p>
        </div>
        <div className={styles.section}>
          <h2>Наши преимущества</h2>
          <ul>
            <li>✅ Только оригинальные товары</li>
            <li>✅ Быстрая доставка по всей стране</li>
            <li>✅ Профессиональная консультация</li>
            <li>✅ Гарантия качества</li>
            <li>✅ Удобные способы оплаты</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Технологии проекта</h2>
          <div className={styles.tech}>
            <span>React 18</span>
            <span>React Router v6</span>
            <span>Context API</span>
            <span>REST API</span>
          </div>
          <p className={styles.apiNote}>
            *Данные загружаются с FakeStore API
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
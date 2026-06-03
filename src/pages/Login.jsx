import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Если уже авторизован, перенаправляем
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
    return null;
  }

  const validate = () => {
    const newErrors = {};
    
    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    // Валидация пароля
    if (!password) {
      newErrors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    
    if (result.success) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      setErrors({ general: result.error || 'Ошибка авторизации' });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Вход в аккаунт</h1>
        
        {errors.general && (
          <div className={styles.errorMessage}>{errors.general}</div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="example@mail.com"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="Минимум 6 символов"
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          
          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        
        <p className={styles.demoHint}>
          Демо-данные:<br />
          email: user@example.com<br />
          пароль: 123456
        </p>
      </div>
    </div>
  );
}

export default Login;
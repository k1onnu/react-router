import { useState, useEffect } from 'react';
import styles from './NetworkStatus.module.css';

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setMessage('Соединение восстановлено');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setMessage('Вы находитесь в офлайн-режиме');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {!isOnline && (
        <div className={styles.offlineBanner}>
          ⚠️ Вы в офлайн-режиме. Некоторые данные могут быть из кеша.
        </div>
      )}
      {showMessage && (
        <div className={`${styles.toast} ${isOnline ? styles.online : styles.offline}`}>
          {message}
        </div>
      )}
    </>
  );
}

export default NetworkStatus;
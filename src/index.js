import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';

// Временно отключаем Service Worker для разработки
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(registration => {
//         console.log('Service Worker зарегистрирован:', registration);
//       })
//       .catch(error => {
//         console.log('Ошибка регистрации Service Worker:', error);
//       });
//   });
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
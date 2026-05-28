import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product) => {
    if (!favorites.some(item => item.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
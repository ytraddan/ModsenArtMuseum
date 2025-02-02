import { useState, useEffect } from 'react';
import { Artwork } from '@/services/api/chicagoArtApi';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Artwork[]>([]);

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (artwork: Artwork) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === artwork.id)) {
        return prev;
      }
      console.log('added', artwork);
      return [...prev, artwork];
    });
  };

  const removeFavorite = (artwork: Artwork) => {
    console.log('removed', artwork);
    setFavorites((prev) => prev.filter((fav) => fav.id !== artwork.id));
  };

  return { favorites, addFavorite, removeFavorite };
}

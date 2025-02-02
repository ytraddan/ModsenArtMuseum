import { ReactNode, useCallback, useEffect, useState } from 'react';
import { FavoritesContext } from '@/contexts/FavoritesContext';
import { Artwork } from '@/services/api/chicagoArtApi';

export default function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
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

  const addFavorite = useCallback((artwork: Artwork) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === artwork.id)) {
        return prev;
      }
      return [...prev, artwork];
    });
  }, []);

  const removeFavorite = useCallback((artwork: Artwork) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== artwork.id));
  }, []);

  const isFavorite = useCallback(
    (artworkId: number) => {
      return favorites.some((fav) => fav.id === artworkId);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

import { Artwork } from '@/services/api/chicagoArtApi';
import { createContext } from 'react';

interface FavoritesContextType {
  favorites: Artwork[];
  addFavorite: (artwork: Artwork) => void;
  removeFavorite: (artwork: Artwork) => void;
  isFavorite: (artworkId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

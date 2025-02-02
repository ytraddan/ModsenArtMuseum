import { FavoritesContext } from '@/contexts/FavoritesContext';
import { useContext } from 'react';
import { Artwork } from '@/services/api/chicagoArtApi';

export default function FavoriteButton({ artwork }: { artwork: Artwork }) {
  const { isFavorite, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  const isCurrentlyFavorite = isFavorite(artwork.id);

  const handleClick = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(artwork);
    } else {
      addFavorite(artwork);
    }
  };

  return (
    <button onClick={handleClick}>
      {isCurrentlyFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
    </button>
  );
}

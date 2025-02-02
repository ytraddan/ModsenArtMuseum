import { useFavorites } from '@/hooks/useFavorites';
import { Artwork } from '@/services/api/chicagoArtApi';

export default function FavoriteButton({ artwork }: { artwork: Artwork }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = favorites.some((fav) => fav.id === artwork.id);

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

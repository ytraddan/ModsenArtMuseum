import { FavoritesContext } from '@/contexts/FavoritesContext';
import { Artwork } from '@/services/api/chicagoArtApi';
import { useContext } from 'react';
import bookmark from '@assets/bookmark.svg';
import './favoriteButton.scss';
import bookmarkFilled from '@assets/bookmark-filled.svg';

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
    <button className="favorite-button" onClick={handleClick}>
      {isCurrentlyFavorite ? (
        <img src={bookmarkFilled} alt="bookmark" />
      ) : (
        <img src={bookmark} alt="bookmark" />
      )}
    </button>
  );
}

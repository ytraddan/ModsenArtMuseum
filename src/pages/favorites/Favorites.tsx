import { FavoritesContext } from '@/contexts/FavoritesContext';
import FavoriteButton from '@components/favoriteButton/FavoriteButton';
import { useContext } from 'react';
import { Link } from 'react-router';
import bookmark from '@assets/bookmark.svg';
import './favorites.scss';

const IMAGE_OPTIONS = 'full/843,/0/default.jpg';
const IIIF_URL = 'https://www.artic.edu/iiif/2';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="favorites-empty-headers">
          <h1>
            No <span className="highlight">Favorites</span> yet.
          </h1>
          <h1>Browse the gallery to add some!</h1>
        </div>

        <Link to="/" className="back-link">
          Go to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h1>
          Here Are Your
          <span className="highlight">
            <img src={bookmark} alt="bookmark" /> Favorites
          </span>
        </h1>

        <div className="favorites-header-text">
          <p className="subtitle">Saved by you</p>
          <h2>Your favorites list</h2>
        </div>
      </div>

      <div className="favorites-grid">
        {favorites.map((artwork) => (
          <div key={artwork.id} className="favorite-item">
            <div className="image-container">
              <Link to={`/artwork/${artwork.id}`}>
                <img
                  src={`${IIIF_URL}/${artwork.image_id}/${IMAGE_OPTIONS}`}
                  alt={artwork.title}
                />
              </Link>
              <FavoriteButton artwork={artwork} />
            </div>

            <div className="artwork-info">
              <Link to={`/artwork/${artwork.id}`}>
                <h3>{artwork.title || 'Untitled'}</h3>
              </Link>
              <p className="artist">{artwork.artist_title || 'Unknown'}</p>
              <p className="copyright">
                {artwork.is_public_domain ? 'Public' : 'Copyrighted'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

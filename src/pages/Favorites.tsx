import { FavoritesContext } from '@/contexts/FavoritesContext';
import FavoriteButton from '@/components/FavoriteButton';
import { useContext } from 'react';
import { Link } from 'react-router';

const IMAGE_OPTIONS = 'full/200,/0/default.jpg';
const IIIF_URL = 'https://www.artic.edu/iiif/2';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <div>
        <h1>Favorites</h1>
        <p>No favorite artworks yet. Browse the gallery to add some!</p>
        <Link to="/">Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Favorites</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {favorites.map((artwork) => (
          <div key={artwork.id}>
            <h2>{artwork.title}</h2>
            {artwork.image_id && (
              <img
                src={`${IIIF_URL}/${artwork.image_id}/${IMAGE_OPTIONS}`}
                alt={artwork.title}
              />
            )}
            <p>{artwork.artist_title}</p>
            <p>{artwork.is_public_domain ? 'Public ' : 'Copyrighted'}</p>
            <Link to={`/artwork/${artwork.id}`}>details</Link>
            <FavoriteButton artwork={artwork} />
          </div>
        ))}
      </div>
    </div>
  );
}

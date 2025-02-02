import { useLoaderData } from 'react-router';
import { homePageLoader } from '@utils/loaders';
import FavoriteButton from '@components/favoriteButton/FavoriteButton';
import { type Artwork } from '@/services/api/chicagoArtApi';
import { Link } from 'react-router';
import './artworks.scss';

const IMAGE_OPTIONS = 'full/400,/0/default.jpg';

export default function Artworks() {
  const { artworks, iiifUrl } = useLoaderData<homePageLoader>();

  if (artworks.length === 0) {
    return <h2 className="no-artworks">No artworks found</h2>;
  }

  return (
    <div className="artworks">
      {artworks.map((artwork) => (
        <Artwork key={artwork.id} artwork={artwork} iiifUrl={iiifUrl} />
      ))}
    </div>
  );
}

function Artwork({ artwork, iiifUrl }: { artwork: Artwork; iiifUrl: string }) {
  return (
    <div className="artwork">
      <Link to={`/artwork/${artwork.id}`}>
        <img
          src={`${iiifUrl}/${artwork.image_id}/${IMAGE_OPTIONS}`}
          alt={artwork.title || 'Untitled'}
          className="artwork-image"
        />
      </Link>

      <div className="artwork-info">
        <Link to={`/artwork/${artwork.id}`}>
          <p className="artwork-title">{artwork.title || 'Untitled'}</p>
        </Link>
        <p className="artist-title">
          {artwork.artist_title || 'Unknown Artist'}
        </p>
        <p className="copyright">
          {artwork.is_public_domain ? 'Public ' : 'Copyrighted'}
        </p>

        <FavoriteButton artwork={artwork} />
      </div>
    </div>
  );
}

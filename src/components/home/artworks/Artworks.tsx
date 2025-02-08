import { type Artwork as ArtworkType } from '@services/api/chicagoArtApi';
import FavoriteButton from '@components/favoriteButton/FavoriteButton';
import { useLoaderData, useNavigation } from 'react-router';
import { homePageLoader } from '@routes/loaders';
import { ROUTES } from '@constants/routes';
import { Link } from 'react-router';
import './artworks.scss';

const IMAGE_OPTIONS = 'full/843,/0/default.jpg';

export default function Artworks() {
  const { artworks, iiifUrl } = useLoaderData<homePageLoader>();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <LoadingGrid />;
  }

  if (artworks.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="artworks">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} iiifUrl={iiifUrl} />
      ))}
    </div>
  );
}

interface ArtworkCardProps {
  artwork: ArtworkType;
  iiifUrl: string;
}

function ArtworkCard({ artwork, iiifUrl }: ArtworkCardProps) {
  return (
    <div className="artwork">
      <Link to={ROUTES.ARTWORK_BY_ID(artwork.id)}>
        <img
          src={`${iiifUrl}/${artwork.image_id}/${IMAGE_OPTIONS}`}
          className="artwork-image"
        />
      </Link>

      <div className="artwork-info">
        <Link to={ROUTES.ARTWORK_BY_ID(artwork.id)}>
          <p className="artwork-title">{artwork.title || 'Untitled'}</p>
        </Link>
        <p className="artist-title">
          {artwork.artist_title || 'Unknown Artist'}
        </p>
        <p className="copyright">
          {artwork.is_public_domain ? 'Public Domain' : 'Copyrighted'}
        </p>

        <FavoriteButton artwork={artwork} />
      </div>
    </div>
  );
}

export function LoadingGrid() {
  return (
    <div className="artworks">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="image-skeleton"
          data-testid="loading-skeleton"
        />
      ))}
    </div>
  );
}

export function NoResults() {
  return (
    <div className="artworks">
      <div className="no-artworks">
        <h2>No artworks found</h2>
      </div>
    </div>
  );
}

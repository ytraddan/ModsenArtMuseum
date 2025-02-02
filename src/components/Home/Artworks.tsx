import { Link, useLoaderData, useNavigation } from 'react-router';
import { homePageLoader } from '@utils/loaders';
import FavoriteButton from '../FavoriteButton';

const IMAGE_OPTIONS = 'full/200,/0/default.jpg';

export default function Artworks() {
  const { artworks, iiifUrl } = useLoaderData<homePageLoader>();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <p>Loading...</p>;
  }

  if (artworks.length === 0) {
    return <p>No artworks found</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {artworks.map((artwork) => (
        <div key={artwork.id}>
          <h2>{artwork.title}</h2>
          {artwork.image_id && (
            <img
              src={`${iiifUrl}/${artwork.image_id}/${IMAGE_OPTIONS}`}
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
  );
}

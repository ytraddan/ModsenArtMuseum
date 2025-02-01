import { HomePageLoaderData } from '@/utils/loaders';
import { useLoaderData, useNavigation } from 'react-router';

const options = 'full/200,/0/default.jpg';

export default function Artworks() {
  const { artworks, iiifUrl } = useLoaderData() as HomePageLoaderData;
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
              src={`${iiifUrl}/${artwork.image_id}/${options}`}
              alt={artwork.title}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
          <p>{artwork.artist_display}</p>
          <p>{artwork.is_public_domain ? 'Public ' : 'Copyrighted'}</p>
        </div>
      ))}
    </div>
  );
}

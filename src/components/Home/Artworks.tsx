import { HomePageLoaderData } from '@/utils/loaders';
import { useLoaderData } from 'react-router';

export default function Artworks() {
  const { artworks } = useLoaderData() as HomePageLoaderData;

  return (
    <div>
      {artworks.map((artwork) => (
        <div key={artwork.id}>
          <h2>{artwork.title}</h2>
          <img src={artwork.image_url} alt={artwork.title} />
        </div>
      ))}
    </div>
  );
}

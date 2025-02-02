import { useLoaderData, Link } from 'react-router';
import { artworkPageLoader } from '@utils/loaders';
import FavoriteButton from '@components/FavoriteButton';

const IMAGE_OPTIONS = 'full/600,/0/default.jpg';

export default function ArtworkDetails() {
  const { artwork, iiifUrl } = useLoaderData<artworkPageLoader>();

  return (
    <div>
      <Link to="/">← Back to Gallery</Link>
      {artwork.image_id && (
        <img
          src={`${iiifUrl}/${artwork.image_id}/${IMAGE_OPTIONS}`}
          alt={artwork.title}
        />
      )}
      <h1>{artwork.title}</h1>
      <p>{artwork.artist_title}</p>
      <p>{artwork.date_display}</p>
      <h2>Overview</h2>
      <p>Origin: {artwork.place_of_origin}</p>
      <p>Dimensions: {artwork.dimensions}</p>
      <p>Credit Line: {artwork.credit_line}</p>
      <p>
        Department: {artwork.department_title}
        {artwork.gallery_title && `, ${artwork.gallery_title}`}
      </p>
      <p>{artwork.is_public_domain ? 'Public ' : 'Copyrighted'}</p>
      <FavoriteButton artwork={artwork} />
    </div>
  );
}

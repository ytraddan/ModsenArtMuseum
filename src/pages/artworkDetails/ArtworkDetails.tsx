import { useLoaderData } from 'react-router';
import { artworkPageLoader } from '@utils/loaders';
import FavoriteButton from '@components/favoriteButton/FavoriteButton';
import { useNavigate } from 'react-router';
import './artworkDetails.scss';

const IMAGE_OPTIONS = 'full/600,/0/default.jpg';

export default function ArtworkDetails() {
  const { artwork, iiifUrl } = useLoaderData<artworkPageLoader>();
  const navigate = useNavigate();

  return (
    <div className="artwork-details">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Go Back
      </button>

      <div className="artwork-content">
        <div className="artwork-image-container">
          <img
            className="artwork-image"
            src={`${iiifUrl}/${artwork.image_id}/${IMAGE_OPTIONS}`}
            alt={artwork.title}
          />
          <FavoriteButton artwork={artwork} />
        </div>

        <div className="artwork-info">
          <div className="artwork-info-header">
            <h1>{artwork.title}</h1>
            <p className="artist">{artwork.artist_title}</p>
            <p className="date">{artwork.date_display}</p>
          </div>

          <div className="artwork-info-body">
            <h2>Overview</h2>

            <div className="details">
              <p>
                <span>Origin: </span>
                {artwork.place_of_origin}
              </p>
              <p>
                <span>Dimensions: </span>
                {artwork.dimensions}
              </p>
              <p>
                <span>Credit Line: </span>
                {artwork.credit_line}
              </p>
              <p>
                <span>Department: </span>
                {artwork.department_title}
                {artwork.gallery_title && `, ${artwork.gallery_title}`}
              </p>
            </div>
            <p className="copyright">
              {artwork.is_public_domain ? 'Public Domain' : 'Copyrighted'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { BASE_URL } from '@constants/chicagoArtApi';

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_title: string;
  is_public_domain: boolean;
}

interface ArtworkDetails extends Artwork {
  date_display: string;
  place_of_origin: string;
  dimensions: string;
  credit_line: string;
  department_title: string;
  gallery_title: string;
}

interface ArtworksResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  config: {
    iiif_url: string;
  };
}

interface ArtworkDetailsResponse {
  data: ArtworkDetails;
  config: {
    iiif_url: string;
  };
}

interface FetchArtworksParams {
  searchTerm: string;
  itemsPerPage: number;
  offset: number;
  sortBy: string;
  fields: string;
}

// Fetches filtered artworks
export async function fetchArtworks(params: FetchArtworksParams) {
  const queryParams = buildQueryParams(params);
  const response = await fetch(`${BASE_URL}/artworks/search?${queryParams}`);

  if (!response.ok) {
    throw new Response('API request failed', { status: response.status });
  }

  return (await response.json()) as ArtworksResponse;
}

// Fetches artwork details
export async function fetchArtworkDetails(artworkId: string, fields: string) {
  console.log(`${BASE_URL}/artworks/${artworkId}?fields=${fields}`);

  const response = await fetch(
    `${BASE_URL}/artworks/${artworkId}?fields=${fields}`
  );

  if (!response.ok) {
    throw new Response('API request failed', { status: response.status });
  }

  return (await response.json()) as ArtworkDetailsResponse;
}

// Constructs URL search parameters based on filters
function buildQueryParams(params: FetchArtworksParams) {
  const { searchTerm, itemsPerPage, offset, sortBy, fields } = params;

  const queryParams = new URLSearchParams({
    q: searchTerm,
    size: String(itemsPerPage),
    from: String(offset),
    fields: fields,
  });

  switch (sortBy) {
    case 'title':
      queryParams.append('sort[title.keyword]', 'asc');
      break;
    case 'date':
      queryParams.append('sort[date_start]', 'desc');
      break;
    case 'artist':
      queryParams.append('sort[artist_title.keyword]', 'asc');
      break;
  }

  return queryParams;
}

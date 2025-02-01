import { BASE_URL } from '@/constants/chicagoArtApi';

export interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_title: string;
  is_public_domain: boolean;
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
    website_url: string;
  };
}

interface FetchArtworksParams {
  searchTerm: string;
  itemsPerPage: number;
  offset: number;
  sortBy: string;
  fields: string;
}

// Fetches filtered artwork data
export async function fetchArtworks(
  params: FetchArtworksParams
): Promise<ArtworksResponse> {
  const queryParams = buildQueryParams(params);
  const response = await fetch(`${BASE_URL}/search?${queryParams}`);

  if (!response.ok) {
    throw new Response('API request failed', { status: response.status });
  }

  return (await response.json()) as ArtworksResponse;
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

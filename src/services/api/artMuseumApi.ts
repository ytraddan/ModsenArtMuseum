export interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_display: string;
  is_public_domain: boolean;
}

interface ArtworksResponse {
  pagination: Pagination;
  data: Artwork[];
  config: ArtworkConfig;
}

interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

interface ArtworkConfig {
  iiif_url: string;
  website_url: string;
}

interface FetchArtworksParams {
  searchTerm: string;
  itemsPerPage: number;
  page: number;
}

const API_URL = 'https://api.artic.edu/api/v1/artworks';

export async function fetchArtworks({
  searchTerm,
  itemsPerPage,
  page,
}: FetchArtworksParams): Promise<ArtworksResponse> {
  const offset = (page - 1) * itemsPerPage;
  const queryParams = new URLSearchParams({
    size: String(itemsPerPage),
    from: String(offset),
    fields: 'id,title,image_id,artist_display,is_public_domain',
  });

  if (searchTerm.length > 0) {
    queryParams.append('query[term][title]', searchTerm);
  }

  const response = await fetch(`${API_URL}/search?${queryParams}`);

  if (!response.ok) {
    throw new Response('API request failed', { status: response.status });
  }

  return (await response.json()) as ArtworksResponse;
}

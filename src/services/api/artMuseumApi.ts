interface ArtworksApiData {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: Artwork[];
  config: {
    iiif_url: string;
  };
}

export interface Artwork {
  id: number;
  title: string;
  image_url: string;
}

interface ArtworksQuery {
  page: string;
  searchTerm?: string;
}

const LIMIT = 3;
const API_URL = 'https://api.artic.edu/api/v1/artworks';

export async function fetchArtworks({ page, searchTerm }: ArtworksQuery) {
  const offset = (parseInt(page) - 1) * 3;
  let query = `&size=${LIMIT}&from=${offset}`;
  query += searchTerm && `&query[term][title]=${searchTerm}`;

  console.log(query);

  const response = await fetch(`${API_URL}/search?${query}`);
  const artworksData = (await response.json()) as ArtworksApiData;

  return {
    artworks: artworksData.data,
    totalPages: artworksData.pagination.total_pages,
    page: artworksData.pagination.current_page,
  };
}

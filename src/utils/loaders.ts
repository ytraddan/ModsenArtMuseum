import { LoaderFunctionArgs } from 'react-router';
import { fetchArtworks, Artwork } from '@services/api/artMuseumApi';

export interface HomePageData {
  artworks: Artwork[];
  totalPages: number;
  page: number;
  iiifUrl: string;
}

const ITEMS_PER_PAGE = 3;

export async function homePageLoader({
  request,
}: LoaderFunctionArgs): Promise<HomePageData> {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const searchTerm = url.searchParams.get('search') || '';

  const artworksData = await fetchArtworks({
    page,
    searchTerm,
    itemsPerPage: ITEMS_PER_PAGE,
  });
  console.log(artworksData);

  return {
    artworks: artworksData.data,
    totalPages: artworksData.pagination.total_pages,
    page: artworksData.pagination.current_page,
    iiifUrl: artworksData.config.iiif_url,
  };
}

export type HomePageLoaderData = Awaited<ReturnType<typeof homePageLoader>>;

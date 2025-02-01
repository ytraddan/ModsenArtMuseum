import { LoaderFunctionArgs } from 'react-router';
import { fetchArtworks } from '@/services/api/chicagoArtApi';
import { ITEMS_PER_PAGE } from '@/constants/chicagoArtApi';

interface URLParams {
  offset: number;
  searchTerm: string;
  sortBy: string;
}

const HOME_PAGE_FIELDS = 'id,title,image_id,artist_title,is_public_domain';

export async function homePageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const { offset, searchTerm, sortBy } = getUrlParams(url);

  const artworksData = await fetchArtworks({
    offset,
    searchTerm,
    sortBy,
    itemsPerPage: ITEMS_PER_PAGE,
    fields: HOME_PAGE_FIELDS,
  });

  console.log(artworksData);

  return {
    artworks: artworksData.data,
    totalPages: artworksData.pagination.total_pages,
    page: artworksData.pagination.current_page,
    iiifUrl: artworksData.config.iiif_url,
  };
}

// Processes URL search parameters
function getUrlParams(url: URL): URLParams {
  const page = parseInt(url.searchParams.get('page') || '1');
  const searchTerm = url.searchParams.get('search') || '';
  const sortBy = url.searchParams.get('sort') || '';
  const offset = (page - 1) * ITEMS_PER_PAGE;

  return { offset, searchTerm, sortBy };
}

export type HomePageLoaderData = Awaited<ReturnType<typeof homePageLoader>>;

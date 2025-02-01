import { LoaderFunctionArgs } from 'react-router';
import { fetchArtworks } from '@/services/api/chicagoArtApi';
import { ITEMS_PER_PAGE, HOME_PAGE_FIELDS } from '@/constants/chicagoArtApi';

export async function homePageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = getUrlParams(url);

  const artworksData = await fetchArtworks({
    ...params,
    itemsPerPage: ITEMS_PER_PAGE,
    fields: HOME_PAGE_FIELDS,
  });

  console.log(artworksData.data[0]?.title);

  return {
    artworks: artworksData.data,
    totalPages: artworksData.pagination.total_pages,
    page: artworksData.pagination.current_page,
    iiifUrl: artworksData.config.iiif_url,
  };
}

// Processes URL search parameters
function getUrlParams(url: URL) {
  const page = parseInt(url.searchParams.get('page') || '1');
  const searchTerm = url.searchParams.get('search') || '';
  const sortBy = url.searchParams.get('sort') || '';
  const offset = (page - 1) * ITEMS_PER_PAGE;

  return { offset, searchTerm, sortBy };
}

export type HomePageLoaderData = Awaited<ReturnType<typeof homePageLoader>>;

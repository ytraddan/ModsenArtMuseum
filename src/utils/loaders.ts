import { LoaderFunctionArgs } from 'react-router';
import {
  ITEMS_PER_PAGE,
  HOME_PAGE_FIELDS,
  ARTWORK_DETAILS_FIELDS,
} from '@constants/chicagoArtApi';
import {
  fetchArtworks,
  fetchArtworkDetails,
} from '@services/api/chicagoArtApi';

export async function homePageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = getUrlParams(url);

  const artworksData = await fetchArtworks({
    ...params,
    itemsPerPage: ITEMS_PER_PAGE,
    fields: HOME_PAGE_FIELDS,
  });

  return {
    artworks: artworksData.data,
    totalPages: artworksData.pagination.total_pages,
    page: artworksData.pagination.current_page,
    iiifUrl: artworksData.config.iiif_url,
  };
}

export async function artworkPageLoader({ params }: LoaderFunctionArgs) {
  const artworkId = params.artworkId;

  if (!artworkId) {
    throw new Response('Artwork ID is required', { status: 400 });
  }

  const artworkDetails = await fetchArtworkDetails(
    artworkId,
    ARTWORK_DETAILS_FIELDS
  );

  return {
    artwork: artworkDetails.data,
    iiifUrl: artworkDetails.config.iiif_url,
  };
}

export type homePageLoader = Awaited<ReturnType<typeof homePageLoader>>;
export type artworkPageLoader = Awaited<ReturnType<typeof artworkPageLoader>>;

// Processes URL search parameters
function getUrlParams(url: URL) {
  const page = parseInt(url.searchParams.get('page') || '1');
  const searchTerm = url.searchParams.get('search') || '';
  const sortBy = url.searchParams.get('sort') || '';
  const offset = (page - 1) * ITEMS_PER_PAGE;

  return { offset, searchTerm, sortBy };
}

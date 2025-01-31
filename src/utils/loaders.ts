import { LoaderFunctionArgs } from 'react-router';
import { fetchArtworks } from '@services/api/artMuseumApi';

export async function homePageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';
  const searchTerm = url.searchParams.get('q') || '';

  const artworksData = await fetchArtworks({ page, searchTerm });
  console.log(artworksData);

  return artworksData;
}

export type HomePageLoaderData = Awaited<ReturnType<typeof homePageLoader>>;

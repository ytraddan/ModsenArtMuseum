import { HomePageLoaderData } from '@/utils/loaders';
import { useLoaderData } from 'react-router';
import { useArtworkFilters } from '@hooks/useArtworkFilters';

export default function Pagination() {
  const { totalPages } = useLoaderData() as HomePageLoaderData;
  const { setFilters, page } = useArtworkFilters();

  if (totalPages === 0) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => setFilters({ page: `${page - 1}` })}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        {page} of {totalPages}
      </span>
      <button
        onClick={() => setFilters({ page: `${page + 1}` })}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

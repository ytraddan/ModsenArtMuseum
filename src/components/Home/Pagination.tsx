import { HomePageLoaderData } from '@/utils/loaders';
import { useLoaderData } from 'react-router';
import { useArtworkFilters } from '@hooks/useArtworkFilters';
import { MAX_PAGES } from '@/constants/chicagoArtApi';

export default function Pagination() {
  const { totalPages } = useLoaderData() as HomePageLoaderData;
  const { setFilters, page } = useArtworkFilters();

  if (totalPages === 0) {
    return null;
  }

  const totalAllowedPages = Math.min(totalPages, MAX_PAGES);

  const rangeStart = Math.floor((page - 1) / 4) * 4 + 1;
  let pages = [rangeStart, rangeStart + 1, rangeStart + 2, rangeStart + 3];
  pages = pages.filter((p) => p > 0 && p <= totalAllowedPages);

  const handlePageChange = (newPage: number) => {
    setFilters({ page: newPage.toString() });
  };

  return (
    <nav>
      <button onClick={() => handlePageChange(page - 1)} hidden={page <= 4}>
        ←
      </button>

      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          disabled={page === pageNum}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        hidden={rangeStart + 4 > totalAllowedPages}
      >
        →
      </button>
    </nav>
  );
}

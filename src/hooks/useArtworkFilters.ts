import { useSearchParams } from 'react-router';
import { useCallback } from 'react';

export type ArtworkFilters = {
  search?: string;
  page?: string;
};

export function useArtworkFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || undefined;
  const page = searchParams.get('page') || undefined;

  const setFilters = useCallback(
    (filters: ArtworkFilters) => {
      setSearchParams(
        (prev) => {
          if (filters.search === '') {
            prev.delete('search');
            prev.delete('page');
          } else if (filters.search) {
            prev.set('search', filters.search);
            prev.delete('page');
          }

          if (filters.page === '1') {
            prev.delete('page');
          } else if (filters.page) {
            prev.set('page', filters.page);
          }

          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const currentPage = page ? parseInt(page) : 1;

  return { search, page: currentPage, setFilters };
}

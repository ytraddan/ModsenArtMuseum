import { useSearchParams } from 'react-router';
import { useCallback } from 'react';

type ArtworkFilters = {
  search?: string;
  page?: string;
  sort?: string;
};

export function useArtworkFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || undefined;
  const page = searchParams.get('page') || undefined;
  const sort = searchParams.get('sort') || undefined;

  const setFilters = useCallback(
    (filters: ArtworkFilters) => {
      if (filters.search === search) {
        return;
      }
      if (filters.search === '' && search === undefined) {
        return;
      }
      setSearchParams(
        (prev) => {
          prev.delete('page');

          if (filters.search === '') {
            prev.delete('search');
          } else if (filters.search) {
            prev.set('search', filters.search);
          }

          if (filters.sort === '') {
            prev.delete('sort');
          } else if (filters.sort) {
            prev.set('sort', filters.sort);
          }

          if (filters.page && filters.page !== '1') {
            prev.set('page', filters.page);
          }

          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams, search]
  );

  const currentPage = page ? parseInt(page) : 1;
  const currentSort = sort || '';

  return { search, sort: currentSort, page: currentPage, setFilters };
}

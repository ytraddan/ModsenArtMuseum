import { useState, useEffect } from 'react';
import { useDebounce } from '@hooks/useDebounce';
import { useArtworkFilters } from './useArtworkFilters';

export function useDebouncedSearch() {
  const { search, setFilters } = useArtworkFilters();
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    if (debouncedSearch === search) {
      return;
    }

    if (debouncedSearch === '' && search === undefined) {
      return;
    }

    setFilters({ search: debouncedSearch });
  }, [debouncedSearch, setFilters, search]);

  return [localSearch, setLocalSearch] as const;
}

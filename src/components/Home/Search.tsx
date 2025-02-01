import { useEffect, useState } from 'react';
import { useArtworkFilters } from '@hooks/useArtworkFilters';
import { useDebounce } from '@hooks/useDebounce';

export default function Search() {
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

  return (
    <input
      type="search"
      placeholder="Search artworks..."
      value={localSearch || ''}
      onChange={(e) => setLocalSearch(e.target.value)}
    />
  );
}

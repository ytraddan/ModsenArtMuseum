import { useEffect, useState } from 'react';
import { useArtworkFilters } from '@hooks/useArtworkFilters';
import { useDebounce } from '@hooks/useDebounce';

export default function Search() {
  const { search, sort, setFilters } = useArtworkFilters();
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
    <div className="search-container">
      <input
        type="search"
        placeholder="Search artworks..."
        value={localSearch || ''}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
      <select
        value={sort}
        onChange={(e) => setFilters({ sort: e.target.value })}
      >
        <option disabled>-- Sort By --</option>
        <option value="">Default</option>
        <option value="title">Title</option>
        <option value="date">Date</option>
        <option value="artist">Artist</option>
      </select>
    </div>
  );
}

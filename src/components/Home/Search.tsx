import { useArtworkFilters } from '@hooks/useArtworkFilters';
import { useDebouncedSearch } from '@hooks/useDebouncedSearch';

export default function Search() {
  const { sort, setFilters } = useArtworkFilters();
  const [searchTerm, setSearchTerm] = useDebouncedSearch();

  return (
    <div className="search-container">
      <input
        type="search"
        placeholder="Search artworks..."
        value={searchTerm || ''}
        onChange={(e) => setSearchTerm(e.target.value)}
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

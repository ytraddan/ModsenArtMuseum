import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm !== searchParams.get('q')) {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('q', debouncedSearchTerm);
          newParams.set('page', '1');
          return newParams;
        },
        { replace: true }
      );
    }
  }, [debouncedSearchTerm, setSearchParams, searchParams]);

  return (
    <input
      type="search"
      placeholder="Search artworks..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
    />
  );
}

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useDebounce from '@/hooks/useDebounce';

export default function useSearchTerm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm === searchParams.get('q')) {
      return;
    }

    setSearchParams(
      (prev) => {
        prev.set('q', debouncedSearchTerm);
        prev.set('page', '1');
        return prev;
      },
      { replace: true }
    );
  }, [debouncedSearchTerm, setSearchParams, searchParams]);

  return [searchTerm, setSearchTerm] as const;
}

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useArtworkFilters } from '@hooks/useArtworkFilters';

const searchSchema = yup
  .object({
    search: yup
      .string()
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        'Search must contain only letters and numbers'
      ),
    sort: yup.string().oneOf(['', 'title', 'date', 'artist']),
  })
  .required();

type SearchFormData = yup.InferType<typeof searchSchema>;

export function useSearchForm() {
  const { search, setFilters, sort } = useArtworkFilters();
  const {
    formState: { errors, isValid },
    register,
    trigger,
    watch,
  } = useForm<SearchFormData>({
    resolver: yupResolver(searchSchema),
    mode: 'onChange',
    defaultValues: {
      search: search || '',
      sort: sort || '',
    },
  });

  const searchValue = watch('search');
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    trigger('search').then((isValid) => {
      if (isValid) {
        setFilters({ search: debouncedSearch });
      }
    });
  }, [debouncedSearch, setFilters, trigger]);

  const handleSortChange = (value: string) => {
    setFilters({ sort: value });
  };

  return {
    register,
    errors,
    isValid,
    handleSortChange,
  };
}

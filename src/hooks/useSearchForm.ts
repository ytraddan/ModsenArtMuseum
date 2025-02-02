import * as yup from 'yup';
import { useArtworkFilters } from '@hooks/useArtworkFilters';
import { useDebounce } from '@hooks/useDebounce';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

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

  const handleSortChange = (value: string) => {
    setFilters({ sort: value });
  };

  useEffect(() => {
    trigger('search').then((isValid) => {
      if (isValid) {
        setFilters({ search: debouncedSearch });
      }
    });
  }, [debouncedSearch, setFilters, trigger]);

  return {
    register,
    errors,
    isValid,
    handleSortChange,
  };
}

import { useSearchForm } from '@hooks/useSearchForm';

export default function Search() {
  const { register, errors, isValid, handleSortChange } = useSearchForm();

  return (
    <div>
      <input
        type="search"
        placeholder="Search artworks..."
        {...register('search')}
      />

      <select
        disabled={!isValid}
        {...register('sort', {
          onChange: (e) => handleSortChange(e.target.value),
        })}
      >
        <option disabled>-- Sort By --</option>
        <option value="">Default</option>
        <option value="title">Title</option>
        <option value="date">Date</option>
        <option value="artist">Artist</option>
      </select>

      {errors.search && <span>{errors.search.message}</span>}
      {errors.sort && <span>{errors.sort.message}</span>}
    </div>
  );
}

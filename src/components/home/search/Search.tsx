import { useSearchForm } from '@hooks/useSearchForm';
import search from '@assets/search.svg';
import './search.scss';

export default function Search() {
  const { register, errors, isValid, handleSortChange } = useSearchForm();

  return (
    <div className="search">
      <div className="search-input">
        <input
          type="search"
          placeholder="Search Art, Artist, Work..."
          {...register('search')}
        />
        <img className="search-icon" src={search} alt="Search" />
      </div>

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

      {errors.search && <span className="error">{errors.search.message}</span>}
    </div>
  );
}

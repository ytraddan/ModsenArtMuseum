import useSearchTerm from '@/hooks/useSearchTerm';

export default function Search() {
  const [searchTerm, setSearchTerm] = useSearchTerm();

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

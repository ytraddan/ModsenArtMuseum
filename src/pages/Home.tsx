import Pagination from '@components/home/Pagination';
import Artworks from '@components/home/Artworks';
import Search from '@components/home/Search';

export default function Home() {
  return (
    <div>
      <h1>Art Gallery</h1>

      <Search />

      <Artworks />

      <Pagination />
    </div>
  );
}

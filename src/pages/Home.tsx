import Pagination from '@components/Home/Pagination';
import Artworks from '@components/Home/Artworks';
import Search from '@components/Home/Search';

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

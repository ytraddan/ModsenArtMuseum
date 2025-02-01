import Artworks from '@/components/Home/Artworks';
import Search from '@/components/Home/Search';
import Pagination from '@/components/Home/Pagination';

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

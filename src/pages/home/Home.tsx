import Pagination from '@components/home/pagination/Pagination';
import Artworks from '@components/home/artworks/Artworks';
import Search from '@components/home/search/Search';
import './home.scss';

export default function Home() {
  return (
    <div className="home">
      <div className="home-header">
        <h1>
          Let's Find Some <span className="highlighted"> Art </span> Here!
        </h1>
        <Search />
      </div>

      <div className="home-content">
        <Artworks />
        <Pagination />
      </div>
    </div>
  );
}

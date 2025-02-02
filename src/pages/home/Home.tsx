import Pagination from '@/components/home/pagination/Pagination';
import Artworks from '@/components/home/artworks/Artworks';
import Loading from '@/components/loading/Loading';
import Search from '@components/home/search/Search';
import { useNavigation } from 'react-router';
import './home.scss';

export default function Home() {
  const navigation = useNavigation();

  return (
    <div className="home">
      <div className="home-header">
        <h1>
          Let's Find Some <span className="highlighted"> Art </span> Here!
        </h1>
        <Search />
      </div>

      <div className="home-content">
        <div className="artworks-container">
          {navigation.state === 'loading' ? <Loading /> : <Artworks />}
        </div>
        <Pagination />
      </div>
    </div>
  );
}

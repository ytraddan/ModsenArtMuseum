import FavoritesProvider from '@/components/providers/FavoritesProvider';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { Outlet } from 'react-router';
import '@/index.css';

export default function Layout() {
  return (
    <div>
      <Header />
      <FavoritesProvider>
        <main>
          <Outlet />
        </main>
      </FavoritesProvider>
      <Footer />
    </div>
  );
}

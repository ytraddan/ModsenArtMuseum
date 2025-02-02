import FavoritesProvider from '@/components/providers/FavoritesProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Outlet } from 'react-router';
import './layout.scss';

export default function Layout() {
  return (
    <div className="layout">
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

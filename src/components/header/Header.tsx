import { NavLink, useLocation } from 'react-router';
import { useState } from 'react';
import bookmark from '@assets/bookmark-header.svg';
import home from '@assets/home.svg';
import logo from '@assets/logo.svg';
import menu from '@assets/menu.svg';
import close from '@assets/close.svg';
import './header.scss';

const NavigationLinks = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/' && (
        <NavLink className="nav-link" to="/">
          <img src={home} alt="Home" />
          <span>Home</span>
        </NavLink>
      )}
      <NavLink className="nav-link" to="/favorites">
        <img src={bookmark} alt="Favorite" />
        <span>Your Favorites</span>
      </NavLink>
    </>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>Museum of Art</span>
        </div>

        <nav className="desktop-nav">
          <NavigationLinks />
          <button
            className="burger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              src={isMenuOpen ? close : menu}
              alt={isMenuOpen ? 'Close' : 'Menu'}
            />
          </button>
        </nav>

        {isMenuOpen && (
          <nav className="mobile-nav">
            <NavigationLinks />
          </nav>
        )}
      </div>
    </header>
  );
}

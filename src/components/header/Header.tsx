import { NavLink, useLocation } from 'react-router';
import bookmark from '@assets/bookmark-header.svg';
import home from '@assets/home.svg';
import logo from '@assets/logo.svg';
import './header.scss';

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>Museum of Art</span>
        </div>
        <nav>
          <NavLink className="nav-link" to="/">
            {location.pathname !== '/' && (
              <>
                <img src={home} alt="Home" />
                Home
              </>
            )}
          </NavLink>

          <NavLink className="nav-link" to="/favorites">
            <img src={bookmark} alt="Favorite" />
            Your Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

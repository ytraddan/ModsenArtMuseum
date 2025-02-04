import logo from '@assets/logo.svg';
import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>Museum of Art</span>
      </div>
    </footer>
  );
}

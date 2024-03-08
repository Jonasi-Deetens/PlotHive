import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav>
        <Link to="/">
            <img src="src/assets/Logo/logo-navbar.svg" alt="navbar-logo-PlotHub"/>
        </Link>
      <ul>
        <li><Link to="/store">Store</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
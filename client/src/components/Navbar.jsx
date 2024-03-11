import { Link } from 'react-router-dom';
import "../assets/styles/components/Navbar/navbar.css"
const Navbar = () => {
  return (
    <nav>
        <Link to="/Home">
            <img src="src/assets/Logo/logo-navbar.svg" alt="navbar-logo-PlotHub"/>
        </Link>
      <ul>
        <li><Link to="/Store">Store</Link></li>
        <li><Link to="/Explore">Explore</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        <li><Link to="/AboutUs">About</Link></li>
        <li><Link to="/Login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
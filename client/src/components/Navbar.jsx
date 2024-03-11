import { Link } from "react-router-dom";
import "../assets/styles/components/Navbar/navbar.css";
const Navbar = () => {
  return (
    <nav className="main-navigation">
      <Link to="/">
        <img src="src/assets/Logo/logo-navbar.svg" alt="navbar-logo-PlotHub" />
      </Link>
      <button className="hamburger hamburger--collapse" type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <ul>
        <li>
          <Link to="/Store">Store</Link>
        </li>
        <li>
          <Link to="/Explore">Explore</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
        <li>
          <Link to="/AboutUs">About</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

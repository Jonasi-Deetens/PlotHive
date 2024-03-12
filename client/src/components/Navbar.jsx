import { Link } from "react-router-dom";
import "../assets/styles/components/Navbar/navbar.css";
import { useState, useEffect, useContext } from "react";
import navBarLogo from "../assets/Logo/logo-navbar.svg";
import { UserContext } from "../providers/UserContext";

const Navbar = () => {
  const {user, authUser} = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {

    authUser();
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsActive(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="main-navigation">
      <Link to="/">
        <img src={navBarLogo} alt="navbar-logo-PlotHub" />
      </Link>
      <button
        className={`hamburger hamburger--collapse ${
          isActive ? "is-active" : ""
        }`}
        type="button"
        onClick={handleClick}
      >
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
        { user ?
        <li>
          <Link to="/Dashboard">{user && user.username}</Link>
        </li> :
        <li>
          <Link to="/Login">Login</Link>
        </li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;

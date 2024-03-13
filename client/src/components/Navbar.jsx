import { NavLink } from "react-router-dom";
import "../assets/styles/components/Navbar/navbar.css";
import { useState, useEffect, useContext } from "react";
import navBarLogo from "../assets/Logo/logo-navbar.svg";
import { UserContext } from "../providers/UserContext";

const Navbar = () => {
  const { user, authUser } = useContext(UserContext);
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
      <NavLink to="/">
        <img src={navBarLogo} alt="navbar-logo-PlotHub" />
      </NavLink>
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
          <NavLink to="/Store" activeClassName="active">
            Store
          </NavLink>
        </li>
        <li>
          <NavLink to="/Explore" activeClassName="active">
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to="/Contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/AboutUs" activeClassName="active">
            About
          </NavLink>
        </li>
        {user ? (
          <li>
            <NavLink to="/Dashboard" activeClassName="active">
              {user && user.username}
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/Login" activeClassName="active">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

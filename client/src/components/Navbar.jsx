import { NavLink } from "react-router-dom";
import "../assets/styles/components/Navbar/navbar.css";
import { useState, useEffect, useContext } from "react";
import navBarLogo from "../assets/Logo/logo-navbar.svg";
import { UserContext } from "../providers/UserContext";

const Navbar = () => {
  const { user, authUser, logout } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const hideModal = () => {
    setIsActive(false);
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
    <>
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
        <ul className="hamburger-list">
          <li>
            <NavLink to="/Store" activeclassname="active">
              Store
            </NavLink>
          </li>
          <li>
            <NavLink to="/Explore" activeclassname="active">
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/Contact" activeclassname="active">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/AboutUs" activeclassname="active">
              About
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/Dashboard" activeclassname="active">
                  {user &&
                    user.username &&
                    user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                </NavLink>
              </li>
              <li>
                <a className="logout-button" onClick={logout}>
                  <img src="src/assets/svgs/logout.svg" alt="logout-icon" />
                </a>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/Login" activeclassname="active">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {isActive && (
        <nav className="menu-modal">
          <ul>
            <li>
              <NavLink to="/Store" activeclassname="active" onClick={hideModal}>
                Store
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Explore"
                activeclassname="active"
                onClick={hideModal}
              >
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Contact"
                activeclassname="active"
                onClick={hideModal}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/AboutUs"
                activeclassname="active"
                onClick={hideModal}
              >
                About
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/Dashboard"
                    activeclassname="active"
                    onClick={hideModal}
                  >
                    {user &&
                      user.username &&
                      user.username.charAt(0).toUpperCase() +
                        user.username.slice(1)}
                  </NavLink>
                </li>
                <li>
                  <a className="logout-button" onClick={logout}>
                    <img src="src/assets/svgs/logout.svg" alt="logout-icon" />
                  </a>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/Login"
                  activeclassname="active"
                  onClick={hideModal}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;

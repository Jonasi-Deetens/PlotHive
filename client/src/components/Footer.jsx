import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import logo from "../assets/Logo/logo-navbar.svg"; // Import your logo image
import "../assets/styles/components/Footer/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="Logo" className="footer-logo" />
      </div>
      <div className="footer-right">
        <Link to="/about">About</Link>
        <Link to="/legal">Legal</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import logo from "../assets/Logo/logo-navbar.svg";
import "../assets/styles/components/Footer/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="footer-logo" />
        </Link>
      </div>
      <div className="footer-right">
        <Link to="/aboutus">About</Link>
        <Link to="/legal">Legal</Link>
        <Link to="/contact" className="contact-link">
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

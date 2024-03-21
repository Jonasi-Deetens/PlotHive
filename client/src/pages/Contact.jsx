import "../assets/styles/pages/contact/contact.css";
import userLogo from "../assets/svgs/user.png";
import userPassword from "../assets/svgs/password.png";
import userEmail from "../assets/svgs/email.png";
import facebook from "../assets/svgs/facebook.png";
import twitter from "../assets/svgs/twitter.png";
import instagram from "../assets/svgs/instagram.png";
import github from "../assets/svgs/github.png";
import textUs from "../assets/svgs/text-us.png";

const Contact = () => {
  return (
    <main className="contact-page">
      <div className="contact-wrapper">
        <div className="social-media-container">
          <ul className="socials-list">
            <li>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={facebook} alt="facebook logo" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={twitter} alt="X logo" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={instagram} alt="instagram logo" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={github} alt="github" />
              </a>
            </li>
          </ul>
        </div>
        <div className="contact-container">
          <h2 className="contact-title">Contact Us</h2>
          <div className="errors">
            <p className="error-message"></p>
          </div>
          <form action="">
            <div className="name">
              <label htmlFor="name">Name</label>
              <div className="name-input">
                <img src={userLogo} alt="name-logo" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Type your name"
                  required
                />
              </div>
              <hr />
            </div>
            <div className="surname">
              <label htmlFor="surname">Surname</label>
              <div className="surname-input">
                <img src={userLogo} alt="surname-logo" />
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Type your surname"
                  required
                />
              </div>
              <hr />
            </div>
            <div className="Email">
              <label htmlFor="Email">Email</label>
              <div className="Email-input">
                <img src={userEmail} alt="Email-logo" />
                <input
                  type="Email"
                  name="Email"
                  id="Email"
                  placeholder="Type your E-mail"
                  required
                />
              </div>
              <hr />
            </div>
            <div className="message">
              <label htmlFor="message">Message</label>
              <div className="message-input">
                <img src={textUs} alt="message-logo" />
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  placeholder="Write us!"
                  required
                ></textarea>
              </div>
              <hr />
            </div>
            <button
              aria-label="Submit Form"
              type="submit"
              className="contact-btn"
            >
              Send
            </button>
          </form>
        </div>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.9072257920957!2d3.7349657000000005!3d51.0363342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c371556f52318f%3A0x5f5246c3223b1ba!2sZuiderpoort!5e0!3m2!1sen!2sbe!4v1710236459275!5m2!1sen!2sbe"
            width="1000"
            height="600"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default Contact;

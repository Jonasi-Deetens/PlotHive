import "../assets/styles/pages/Register/register.css";
import emailLogo from "../assets/svgs/email.png";
import userLogo from "../assets/svgs/user.png";
import userPassword from "../assets/svgs/password.png";

const Register = () => {
  return (
    <main className="register-page">
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <div className="errors">
          <p className="error-message">Password deosn&apos;t match</p>
          <p className="error-message">E-mail field can&apos;t be empty</p>
        </div>
        <form action="">
          <div className="email">
            <label htmlFor="email">E-mail</label>
            <div className="email-input">
              <img src={emailLogo} alt="email-logo" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Register with your e-mail"
                required
              />
            </div>
            <hr />
          </div>
          <div className="username">
            <label htmlFor="username">Username</label>
            <div className="username-input">
              <img src={userLogo} alt="username-logo" />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Type your username"
                required
              />
            </div>
            <hr />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <img src={userPassword} alt="password-logo" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Type your password"
                required
              />
            </div>
            <hr />
          </div>
          <div className="repeat-password">
            <label htmlFor="repeat-password">Password</label>
            <div className="repeat-password-input">
              <img src={userPassword} alt="password-logo" />
              <input
                type="repeat-password"
                name="repeat-password"
                id="repeat-password"
                placeholder="Repeat your password"
                required
              />
            </div>
            <hr />
          </div>
          <button type="submit" className="sign-up-btn">
            Sign Up
          </button>
          <div className="question">
            <p>Already have an account?</p>
            <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;

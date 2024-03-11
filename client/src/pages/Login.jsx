import "../assets/styles/pages/Login/login.css";
import userLogo from "../assets/svgs/user.png";
import userPassword from "../assets/svgs/password.png";

const Login = () => {
  return (
    <main className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form action="">
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
          <a href="" className="forgot-password">
            Forgot password?
          </a>
          <button type="submit" className="login-btn">
            Login
          </button>
          <div className="question">
            <p>Don&apos;t have an account?</p>
            <a href="/register">Register</a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;

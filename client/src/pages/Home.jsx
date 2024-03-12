import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/Home/home.css";

const Home = () => {
  return (
    <main className="home-page">
      <header className="home-page-header">
        <div className="home-page-navbar">
          <Link to="/">
            {" "}
            {/* Link to the homepage */}
            <img src="src/assets/Logo/logo-home.svg" alt="Large-Logo" />
          </Link>
          <button className="home-page-login">
            <Link to="/Login">Login</Link>
          </button>
        </div>
        <div className="main-header-container">
          <h1 className="main-header">
            {" "}
            &quot;Jonasi stepped out of the elevator with blood all over his
            face, ... &quot;
          </h1>
        </div>
        <div className="home-button-container">
          <button className="home-header-button">
            <Link to="/Write" className="home-link">
              Keep writing
            </Link>
          </button>
          <button className="home-header-button">
            <Link to="/Explore" className="home-link">
              Explore
            </Link>
          </button>
        </div>
      </header>
      <div className="card-container">
        <Link to="/About" className="card">
          <img src="src/assets/Logo/logo-navbar.svg" alt="icon1" />
          <p>Write stories as a community</p>
        </Link>
        <Link to="/About" className="card">
          <img src="src/assets/Logo/logo-navbar.svg" alt="icon2" />
          <p>Upvote the part that would fit the story best</p>
        </Link>
        <Link to="/About" className="card">
          <img src="src/assets/Logo/logo-navbar.svg" alt="icon3" />
          <p>Earn by contributing</p>
        </Link>
        <Link to="/About" className="card">
          <img src="src/assets/Logo/logo-navbar.svg" alt="icon4" />
          <p>Earn badges</p>
        </Link>
      </div>
      <h1 className="popular-header">Popular right now</h1>
      <div className="popular-section">
        <div className="popular-cards">
          <Link to="/Store" className="popular-card">
            <img src="src/assets/Logo/logo-navbar.svg" alt="icon1" />
            <p>Popular story 1</p>
          </Link>
          <Link to="/Store" className="popular-card">
            <img src="src/assets/Logo/logo-navbar.svg" alt="icon2" />
            <p>Popular story 2</p>
          </Link>
          <Link to="/Store" className="popular-card">
            <img src="src/assets/Logo/logo-navbar.svg" alt="icon3" />
            <p>Popular story 3</p>
          </Link>
        </div>
      </div>
      <h2 className="section-three">
        Welcome to your journey through the magical art of writing.
      </h2>
    </main>
  );
};

export default Home;

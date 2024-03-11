import React from 'react'
import { Link } from 'react-router-dom';
import "../assets/styles/pages/Home/home.css"
const Home = () => {
  return (
    <>
    <main className='home-page'>
    <h1> &quot;Jonasi stepped out of the elevator with blood all over his face, ... &quot;
    </h1>
    <div>
      <button className='home-header-button'><Link to="/Write" className='home-header-button'> Keep writing </Link></button>
      <button className='home-header-button'><Link to="/Explore" className='home-header-button'>Explore</Link></button>
    </div>
    <div className="card-container">
  <div className="card">
  <img src="src/assets/Logo/logo-navbar.svg" alt="icon1" />
    <p>Write stories as a community</p>
  </div>
  <div className="card">
  <img src="src/assets/Logo/logo-navbar.svg" alt="icon2" />
    <p>Upvote the part that would fit the story best</p>
  </div>
  <div className="card">
  <img src="src/assets/Logo/logo-navbar.svg" alt="icon3" />
    <p>Earn by contributing</p>
  </div>
  <div className="card">
    <img src="src/assets/Logo/logo-navbar.svg" alt="icon4" />
    <p>Earn badges</p>
  </div>
</div>
<h1>Popular right now</h1>
<div className="popular-section">
  <div className='popular-cards'>
    <div className="popular-card">
      <img src="src/assets/Logo/logo-navbar.svg" alt="icon1" />
      <p>Popular story 1</p>
    </div>
    <div className="popular-card">
      <img src="src/assets/Logo/logo-navbar.svg" alt="icon2" />
      <p>Popular story 2</p>
    </div>
    <div className="popular-card">
      <img src="src/assets/Logo/logo-navbar.svg" alt="icon3" />
      <p>Popular story 3</p>
    </div>
  </div>
</div>
    </main>
    </>
  )
}

export default Home
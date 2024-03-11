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
    </main>
    </>
  )
}

export default Home
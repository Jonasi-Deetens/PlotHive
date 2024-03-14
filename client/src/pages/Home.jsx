
import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import "../assets/styles/pages/Home/home.css";
import BookShowcase from "../components/BookShowcase";
import book from "../assets/svgs/book-home.svg"
import { useEffect } from "react";
import { BookContext } from "../providers/BookContext";

const Home = () => {
  const { getLatestBook } = useContext(BookContext);
  const [title, setTitle] = useState('"');

  useEffect(() => {
    if (getLatestBook()) {
      let prompt = getLatestBook().prompt_id.content + ", ...";
      let promptCharArray = prompt.split('');

      const maxIndex = promptCharArray.length;
      
      const typeChar = (currentTitle, currentIndex) => {
        if (currentIndex >= maxIndex) {
          const nextTitle = currentTitle.split('_')[0] + '"_';
          setTitle(nextTitle);
          return; 
        }
        
        const nextTitle = currentTitle.split('_')[0] + promptCharArray[currentIndex] + '_';
        setTitle(nextTitle);
      
        setTimeout(() => {
          typeChar(nextTitle, currentIndex + 1);
        }, 50); 
      }

      typeChar(title, 0);
    }
      
  }, [])
  

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
          <div className="main-header-container">
            <h1 className="main-header custom-header">{title}</h1>
          </div>
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
      <section className="card-container-wrapper">
        <div className="card-container">
          <Link to="/About" className="card">
            <img src="src/assets/svgs/book.svg" alt="icon1" />
            <p>Write stories as a community</p>
          </Link>
          <Link to="/About" className="card">
            <img src="src/assets/svgs/vote.svg" alt="icon2" />
            <p>Upvote the part that would fit the story best</p>
          </Link>
          <Link to="/About" className="card">
            <img src="src/assets/svgs/money.svg" alt="icon3" />
            <p>Earn by contributing</p>
          </Link>
          <Link to="/About" className="card">
            <img src="src/assets/svgs/badge.svg" alt="icon4" />
            <p>Earn badges</p>
          </Link>
        </div>
        <BookShowcase category={"like-this"} />
      </section>
      <h2 className="section-three">
        Welcome to your journey through the magical art of writing.
      </h2>
      <figure className="home-figure">
        <img className="home-image" src={book} alt="Image of a open book" />
      </figure>
    </main>
  );
};

export default Home;

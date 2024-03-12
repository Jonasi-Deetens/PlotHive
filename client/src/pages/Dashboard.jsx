import "../assets/styles/pages/Dashboard/dashboard.css";
import navBarLogo from "../assets/Logo/logo-navbar.svg";
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import cover from "../assets/svgs/cover.png"

const Dashboard = () => {
  const { authUser, user, logout } = useContext(UserContext)
  const [books, setBooks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        if (!user) {
          await authUser();
          if (!user) {
            navigate("/Login");
          }
        }
      } catch (error) {
        console.error("Failed to authenticate");
      }
    };

    isAuthorized();

    const getBooks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/books', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }

    getBooks();
  }, [authUser, navigate, user]);

  return (
    <main className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>
      <section className="section-profile">
        <div className="flex-wrapper">
          <div className="section-profile-left">
            <img src={navBarLogo} alt="profile-picture" />
            <p className="profile-name">{user && user.username}</p>
            <p className="profile-stat">0 followers</p>
            <p className="profile-stat">0 following</p>
            <button className="profile-button">Edit profile</button>
            <br />
            <button className="profile-button-logout" onClick={logout}>Logout</button>
          </div>
          <div className="section-profile-right">
            <div className="badge">
              <p className="badge-title">Books contributed to</p>
              <p className="badge-number">13</p>
            </div>
            <div className="badge">
              <p className="badge-title">Made the final version</p>
              <p className="badge-number">3</p>
            </div>
            <div className="badge">
              <p className="badge-title">Comments received</p>
              <p className="badge-number">45</p>
            </div>
            <div className="badge">
              <p className="badge-title">Character written</p>
              <p className="badge-number">2964</p>
            </div>
            <div className="badge">
              <p className="badge-title">Chapters written</p>
              <p className="badge-number">24</p>
            </div>
            <div className="badge">
              <p className="badge-title">Upvotes received</p>
              <p className="badge-number">344</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-profile">
        <h2 className='book-prompt'> &quot;Jonasi stepped out of the elevator with blood all over his face, ... &quot;</h2>
        <div className='button-container'>
          <button className='prompt-button'><a href="/Write" className='link'>Contribute</a></button>
          <button className='prompt-button'><a href="/Explore" className='link'>Explore</a></button>
        </div>
      </section>
      <section className="section-profile">
        <h2 className="section-title">You might like</h2>
        <div className="flex-wrapper">
        {books && books.map((book) => (
          <div className="profile-book" key={'BOOK_KEY_' + book._id}>   
            <img className="profile-book-image" src={cover} width={100} height={160} alt="Placeholder of an image of a book" />
            <h3 className="profile-book-title">{book.title}</h3>
          </div>
        ))}
        </div>
      </section>
    </main>
  )
}

export default Dashboard
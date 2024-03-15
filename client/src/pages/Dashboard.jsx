import "../assets/styles/pages/Dashboard/dashboard.css";
import profile from "../assets/img/portraits/portrait1.jpeg";
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import BookShowcase from "../components/BookShowcase";
import UserStats from "../components/UserStats";
import LikedBooks from "../components/LikedBooks";
import LatestContributions from "../components/LatestContributions";
import UserUpdateForm from "../components/UserUpdateForm";

const Dashboard = () => {
  const { authUser, user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        if (!user) {
          const checkAuth = await authUser();
          if (!checkAuth) {
            navigate("/Login");
          }
        }
      } catch (error) {
        console.error("Failed to authenticate");
      }
    };

    isAuthorized();
  }, [authUser, navigate, user]);

  return (
    <main className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>
      <section className="section-profile">
        <div className="flex-wrapper">
          <div className="section-profile-left">
            <img src={profile} alt="profile-picture" />
            <p className="profile-name">{user && user.username}</p>
            <button onClick={() => setEditing(!editing)} className="profile-button">{ editing ? 'Statistics' : 'Edit profile' }</button>
            <br />
            <button className="profile-button-logout" onClick={logout}>Logout</button>
          </div>
          <div className="section-profile-right">
            {editing?(  
              <UserUpdateForm />
            ): (
              <UserStats />
            )}
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
      <section className="section-profile-half">
        <div className="flex-wrapper">
          <LatestContributions />
          <LikedBooks />
        </div>
      </section>
      <BookShowcase category={"top"} />
    </main>
  )
}

export default Dashboard
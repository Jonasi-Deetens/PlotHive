import "../assets/styles/pages/Dashboard/dashboard.css";
import navBarLogo from "../assets/Logo/logo-navbar.svg";
import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserContext";

const Dashboard = () => {
  const { authUser, user, logout } = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        if (!user) {
          await authUser();
          if (!user) {
            navigate("/");
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
      <h2 className="dashboard-title">Dashboard</h2>
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
    </main>
  )
}

export default Dashboard
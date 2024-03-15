import "../assets/styles/pages/Dashboard/dashboard.css";
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import BookShowcase from "../components/BookShowcase";
import UserStats from "../components/UserStats";
import LikedBooks from "../components/LikedBooks";
import LatestContributions from "../components/LatestContributions";
import UserInfo from "../components/UserInfo";
import { BookContext } from "../providers/BookContext";

const Dashboard = () => {
  const { authUser, user } = useContext(UserContext);
  const { getLatestBook } = useContext(BookContext)
  const navigate = useNavigate();

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
          <section className="section-profile-left">
              <UserInfo />
          </section>
          <section className="section-profile-right">
              <UserStats />
              <hr />
              <div className="flex-wrapper">
                <LatestContributions />
                <LikedBooks />
              </div>
          </section>
        </div>
      </section>
      <section className="section-title">
        <h2 className='book-prompt'>{'"' + getLatestBook().prompt_id.content + ',..."'}</h2>
        <div className='button-container'>
          <Link to={"/Write?" + getLatestBook()._id}  className='link'><button className='prompt-button'>Contribute</button></Link>
          <Link to="/Explore" className='link'><button className='prompt-button'>Explore</button></Link>
        </div>
      </section>
      <BookShowcase category={"top"} />
    </main>
  )
}

export default Dashboard
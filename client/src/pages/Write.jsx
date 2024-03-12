import React, { useContext } from 'react'
import { UserContext } from '../providers/UserContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Write = () => {
  const { authUser, user } = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        await authUser();
        if (!user) {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to authenticate");
      }
    };

    isAuthorized();
  }, [authUser, navigate, user]);

  return (
    <div>Write</div>
  )
}

export default Write
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  }

  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      } else {
        setUser({
          username: userData.username,
          email: userData.email
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <UserContext.Provider value={{user, registerUser, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext} ;
import React, { createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
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
        throw new Error('Failed to register user');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <UserContext.Provider value={{registerUser}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext} ;
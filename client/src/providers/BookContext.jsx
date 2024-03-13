import React, { createContext, useState } from 'react';

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(null);

  return (
    <UserContext.Provider value={{user, authUser, registerUser, loginUser, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext} ;
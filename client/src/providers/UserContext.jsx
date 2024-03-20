import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const authUser = async () => {
    if (!user) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:5000/auth/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          return data;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
    
  };

  const loginUser = async (userData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      } else {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("token", data.token);
        return data.user;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      } else {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("token", data.token);
        return data.user;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, authUser, registerUser, loginUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

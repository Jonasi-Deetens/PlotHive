import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserContext.jsx";
import { BookProvider } from "./providers/BookContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <BookProvider>
      <Router>
        <App />
      </Router>
    </BookProvider>
    </UserProvider>
  </React.StrictMode>
);

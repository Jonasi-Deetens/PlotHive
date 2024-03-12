import "./assets/styles/app.css";
import Navbar from "./components/Navbar";
import {Routes, Route, useLocation} from 'react-router-dom';
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard"
import Explore from "./pages/Explore"
import Legal from "./pages/Legal"
import Login from "./pages/Login"
import Read from "./pages/Read"
import Register from "./pages/Register"
import Store from "./pages/Store"
import Write from "./pages/Write"
import Error404 from "./pages/Error404";

function App() {
  const location = useLocation().pathname;
  const headerLocations = ["/", "/aboutus", "/contact", "/dashboard", "/explore", "/legal", "/login", "/read", "/register", "/store", "/write"];

  return (
    <>
      {headerLocations.includes(location.toLocaleLowerCase()) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/Legal" element={<Legal />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Read" element={<Read />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/Write" element={<Write />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
    </>
  );
}

function AppWithNavbar() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/AboutUs" />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Legal" element={<Legal />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Read" element={<Read />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/Write" element={<Write />} />
      </Routes>
    </>
  );
}

export default App;

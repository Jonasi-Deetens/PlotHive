import "./assets/styles/app.css";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Legal from "./pages/Legal";
import Login from "./pages/Login";
import Read from "./pages/Read";
import Register from "./pages/Register";
import Store from "./pages/Store";
import Write from "./pages/Write";
import Error404 from "./pages/Error404";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const headerLocations = [
    "/aboutus",
    "/contact",
    "/dashboard",
    "/explore",
    "/legal",
    "/login",
    "/read",
    "/register",
    "/store",
    "/write",
  ];

  const is404Page = location.pathname === "/Error404";

  const isHeaderLocation = headerLocations.includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {isHeaderLocation && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/read" element={<Read />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store" element={<Store />} />
        <Route path="/write" element={<Write />} />
        <Route path="/Error404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/Error404" />} />
      </Routes>

      {!is404Page && <Footer />}
    </>
  );
}

export default App;

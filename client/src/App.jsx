import "./assets/styles/app.css";
import Navbar from "./components/Navbar";
import {Routes, Route} from 'react-router-dom';
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

function App() {
  return (
    <>
      <Navbar />
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

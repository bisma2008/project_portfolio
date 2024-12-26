import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import About from "./components/about/About.jsx";
import Login from "./components/Login/Login.jsx";  // Impor halaman Login
import Register from "./components/Register/Register.jsx";  // Impor halaman Register
import Dashboard from "./components/Dashboard/Dashboard.jsx";  // Impor halaman Dashboard

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />  {/* Rute untuk Login */}
        <Route path="/register" element={<Register />} />  {/* Rute untuk Register */}
        <Route path="/dashboard" element={<Dashboard />} />  {/* Rute untuk Dashboard Admin */}
      </Routes>
    </Router>
  );
}

export default App;

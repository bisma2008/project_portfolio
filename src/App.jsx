import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import About from "./components/about/About.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import AddBuketForm from "./components/AddBuket/AddbuketForm.jsx";
import EditBuketForm from "./components/EditBuketForm/EditBuketForm.jsx";
import PrivateRoute from "./private/PrivateRoute.jsx";

function App() {
  // Define isAuthenticated state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          
          {/* Use PrivateRoute for pages requiring authentication */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/addbuketform"
            element={<PrivateRoute element={<AddBuketForm />} />}
          />
          <Route
            path="/editbuketform/:id"
            element={<PrivateRoute element={<EditBuketForm />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

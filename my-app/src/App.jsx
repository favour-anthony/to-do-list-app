import React from "react";
import {Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/navbar";
import Dashboard from "./pages/dashboard";
import Active from "./pages/active";
import Completed from "./pages/completed";
import SignUp from "./pages/signup";

const App = () => {
  const location = useLocation(); 

  const hideNavbarRoutes = ["/"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen">
      {shouldShowNavbar && <Navbar />}

      <div className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="/" element={<SignUp />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/active" element={<Active />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

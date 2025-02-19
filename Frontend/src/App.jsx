import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AuthForm from "./Components/LoginComponents/AuthForm";
import Dashboard from "./Components/DashBoardComponents/Dashboard";
import { useAuth } from "./Context/AuthProvider";
import ProtectedRouteForLogin from "./Context/ProtectedRoute";

function App() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/login"
        element={
          <ProtectedRouteForLogin>
            <AuthForm />
          </ProtectedRouteForLogin>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

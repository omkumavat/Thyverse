import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login, logout } from "./store/authSlice";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AuthForm from "./Components/LoginComponents/AuthForm";
import authService from "./appwrite/Auth";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<AuthForm />} />
    </Routes>
  );
}

export default App;

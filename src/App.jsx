import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import About from './Pages/About';
import AuthForm from "./Components/LoginComponents/AuthForm";
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<AuthForm/>}></Route>
      </Routes>
  );
}

export default App;

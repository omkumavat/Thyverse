import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import About from './Pages/About';
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
  );
}

export default App;

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact";
import React from "react";
import Footer from "./components/Footer.jsx"
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;

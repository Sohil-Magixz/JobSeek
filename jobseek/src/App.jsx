import React from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Footer from "./components/Footer.jsx"
import { Routes, Route } from "react-router-dom";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import NewPassword from "./pages/NewPassword.jsx";


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/newpassword" element={<NewPassword/>}/>
      </Routes>
      <Footer />

    </>
  );
}

export default App;

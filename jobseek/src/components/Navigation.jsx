import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link

function Navigation() {
  const [x, setX] = useState("hidden mr-2 justify-center items-center");

  function showBar() {
    if (x.includes("hidden")) {
      setX("sm:flex mr-2 flex-col justify-end items-end mx-12");
    } else {
      setX("hidden mr-2 justify-end items-end");
    }
  }

  return (
    <>
      <div className="nav-bar h-[70px] w-screen bg-cyan-700 flex justify-around sm:justify-around items-center mx-auto rounded-b-2xl">
        <h1 className="sm:ml-2 center text-4xl text-white">Job Seek.</h1>

        {/* Desktop Navigation */}
        <ul className="sm:flex hidden mr-2 justify-center items-center">
          <Link to="/"><li className="bg-gray-100 mr-1 h-[50px] px-6 text-cyan-700 flex items-center rounded-[16px] hover:scale-105">Home</li></Link>
          <Link to="/about"><li className="bg-gray-100 mx-10 h-[50px] px-6 text-cyan-700 flex items-center rounded-[16px] hover:scale-105">About</li></Link>
          <Link to="/contact"><li className="bg-gray-100 ml-1 h-[50px] px-6 text-cyan-700 flex items-center rounded-[16px] hover:scale-105">Contact</li></Link>
        </ul>

        {/* Hamburger Button */}
        <button className="bg-green-500 sm:hidden" onClick={showBar}><p>H</p></button>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex flex-col justify-end items-end bg-amber-950 w-screen">
        <ul className={x}>
          <Link to="/"><li className="mb-1 h-[20px] px-6 bg-amber-600 flex items-center">Home</li></Link>
          <Link to="/about"><li className="my-1 h-[20px] px-6 bg-amber-600 flex items-center">About</li></Link>
          <Link to="/contact"><li className="mt-1 h-[20px] px-4 bg-amber-600 flex items-center">Contact</li></Link>
        </ul>
      </div>
    </>
  );
}

export default Navigation;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hmenu from "../assets/hmenu.png";
function Navigation() {
  const [x, setX] = useState("hidden mr-2 justify-center items-center");
  const [y, setY] = useState("hidden absolute right-0 top-[110%] bg-white shadow-lg rounded-md w-[150px] z-10 mt-[2px]")
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tuser = localStorage.getItem("user");
    if(tuser!=="undefined"){
      const userData = JSON.parse(tuser);
      if (userData) setUser(userData);
    }
  }, []);

  function showBar() {
    if (x.includes("hidden")) {
      setX("sm:flex mr-2 flex-col justify-end items-end mx-12");
    } else {
      setX("hidden mr-2 justify-end items-end");
    }
  }
  function showUserDetail(){
    if(y.includes("hidden")){
      setY("absolute right-0 top-[110%] bg-white shadow-lg rounded-md w-auto z-10 mt-[2px]");
    }else{
      setY("absolute right-0 top-[110%] bg-white shadow-lg rounded-md w-[150px] z-10 mt-[2px] hidden")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  }

  return (
    <>
      <div className="top-0 fixed sm:relative nav-bar h-[70px] w-screen bg-cyan-700 flex justify-around sm:justify-around items-center mx-auto rounded-b-2xl z-50">
        <h1 className="sm:ml-2 center text-4xl text-white">Job Seek.</h1>

        <ul className="sm:flex hidden mr-2 justify-center items-center">
          <Link to="/"><li className="bg-gray-100 mr-2 h-[50px] px-6 text-cyan-700 flex items-center rounded-[16px] hover:scale-105">Home</li></Link>
          <Link to="/about"><li className="bg-gray-100 mx-3 h-[50px] px-6 text-cyan-700 flex items-center rounded-[16px] hover:scale-105">About</li></Link>
          <Link to="/contact"><li className="bg-gray-100 mx-2 h-[50px] px-6 text-cyan-700 flex items-center rounded-[16px] hover:scale-105">Contact</li></Link>
          {!user ? (
            <>
              <Link to="/register">
                <li className="bg-gray-100 mx-2 h-[50px] px-6 text-cyan-700 flex items-center rounded-[16px] hover:scale-105">
                  Register
                </li>
              </Link>
              <Link to="/login">
                <li className="bg-gray-100 mx-2 h-[50px] px-6 text-cyan-700 flex items-center rounded-[16px] hover:scale-105">
                  Login
                </li>
              </Link>
            </>
          ) : (
            <li onClick={showUserDetail} className="relative group bg-gray-100 max-w-[100px] overflow-lip mx-2 h-[50px] px-6 text-cyan-700 flex flex-col justify-center items-center rounded-[16px] hover:scale-105 cursor-pointer">
              <p className="overflow-auto">{user.username || "User"}</p>
              <div className={y}>
                {/* <div className="h-[10px] bg-opacity-0">.</div> */}
                <p className="mx-1 text-center bg-amber100 py-2 border-b text-sm text-gray-700">
                  {user.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 cursor-pointer">
                  Logout
                </button>
              </div>
            </li>
           )}
        </ul>

        <button className=" sm:hidden h-[30px] w-[30px]" onClick={showBar}><img src={hmenu} alt="Image" /></button>
      </div>

      <div className="sm:hidden fixed z-50 flex flex-col justify-end items-end bg-amber950 w-screen">
        <ul className={x}>
          <Link to="/"><li className="bg-cyan-700 mx-2 h-[50px] px-6 text-gray-100 flex items-center rounded[16px] hover:scale-105">Home</li></Link>
          <Link to="/about"><li className="bg-cyan-700 mx-2 h-[50px] px-6 text-gray-100 flex items-center rounded[16px] hover:scale-105">About</li></Link>
          <Link to="/contact"><li className="bg-cyan-700 mx-2 h-[50px] px-6 text-gray-100 flex items-center rounded[16px] hover:scale-105">Contact</li></Link>
          {!user ? (
            <>
              <Link to="/register">
                <li className="bg-cyan-700 mx-2 h-[50px] px-6 text-gray-100 flex items-center rounded[16px] hover:scale-105">
                  Register
                </li>
              </Link>
              <Link to="/login">
                <li className="bg-cyan-700 mx-2 h-[50px] px-6 text-gray-100 flex items-center rounded-b-[16px] hover:scale-105">
                  Login
                </li>
              </Link>
            </>
          ) : (
            <li onClick={showUserDetail} className="relative group bg-cyan-700 mx-2 h-[50px] px-6 text-gray-100 flex flex-col justify-center items-center rounded-b-[16px] hover:scale-105 cursor-pointer">
              {user.username || "User"}
              <div className={y}>
                {/* <div className="h-[10px] bg-opacity-0">.</div> */}
                <p className="mx-auto text-center bg-amber100 py-2 border-b text-sm text-gray-700">
                  {user.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 cursor-pointer">
                  Logout
                </button>
              </div>
            </li>
           )}
        </ul>
      </div>
    </>
  );
}

export default Navigation;

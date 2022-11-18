import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../global.css";

const NavBar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className='bg-gray-800 shadow-lg  '>
      <div className=' font-extrabold text-green-50  sm:text-1xl md:text-2xl h-32 flex justify-between items-center w-[90%] m-auto'>
        <div>
          <h1 className=' tracking-widest cursor-pointer bg-[rgba(0, 0, 0,5)] text-3xl w-40 flex justify-center'>
            <span className='text-gray-900'>TIME</span>LOCK
          </h1>
          <p className='text-md pr-5 pt-2 tracking-wide max-w-sm md:hidden'>
            {" "}
            {user && user.email}
          </p>
        </div>

        <p className=' text-2xl lg:flex justify-center w-2/4 tracking-wide hidden '>
          <span className='animate-pulse text-blue-300 '>WELCOME! </span>
          <span className='invisible'>a</span> TO YOUR DASHBOARD!
        </p>

        <div className='md:w-44'>
          {/* <p className='text-md pr-5 pt-2 tracking-wide max-w-sm hidden md:inline-block'>
          {" "}
          {user && user.email}
        </p> */}
          <button
            onClick={handleLogout}
            className='hover:text-gray-600 hover:bg-white  border rounded-md px-6 py-2 pr-5 transition ease-in-out  duration-100 '
          >
            Logout
          </button>
          <p className='hidden md:block text-sm mt-2 '>{user && user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

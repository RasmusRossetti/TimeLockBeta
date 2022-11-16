import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

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
    <div className='bg-gray-800 shadow-md  '>
      <div className=' font-extrabold text-green-50  sm:text-1xl md:text-2xl h-32 flex justify-between items-center w-[90%] m-auto'>
        <p> {user && user.email}</p>

        <button onClick={handleLogout} className='border px-6 py-2 my-4'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const [menu, setMenu] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const handleMenu = () => {
    setMenu((prev) => !prev);
  };
  useEffect(()=>{
    setToken(localStorage.getItem("token"));
    if(token){
      navigate("/");
    }
  },[])
  const handleLogout = async () => {
    // request to the server to clear the token
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{},{
        withCredentials: true
      })
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="flex justify-between items-center py-4 px-2 md:px-10  md:py-6 lg:py-8">
      <Link to={"/"} className="flex items-center">
        <img src="/assets/logo.png" className='w-36' alt="" />
      </Link>
      <div className="hidden md:flex items-center gap-5">
        <Link to={"/"} className="text-gray-400 mx-4 hover:text-blue-600 transition duration-300 ease-in-out">
          Home
        </Link>
        {
          token && token ? 
        <>
        <Link to={"/login"} onClick={handleLogout} className="text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out">
            Logout
        </Link>
        <Link to={"/history"} className="text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out">
            History
        </Link>
        </>
        :<>
        <Link to={"/login"} className="text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out">
          Login
        </Link>
        <Link to={"/signup"} className="text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out ml-4">
          Sign Up
        </Link>        
        </>
        }
        <Link to={"/docs"} className="text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out ml-4">
          Docs
        </Link>
      </div>
      <div className="md:hidden flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleMenu}
        >
          {menu ? "Close" : "Menu"}
        </button>
        {/* // creating menu bar for mobile view */}
        {menu && (
          <div className=" sm:w-full absolute border-2 top-20 right-0 backdrop-blur-xl w-full max-w-xs shadow-md rounded-lg">
            <div className="py-4 px-6 flex flex-col text-gray-400">
              <Link to={"/"} className=" hover:text-blue-600 mb-4 transition duration-300 ease-in-out">
                Home
              </Link>
              {
                token && token ?
                <>
                <Link onClick={handleLogout} className=" hover:text-blue-600 transition duration-300 ease-in-out">
                Logout
              </Link>
              <Link to={"/history"} className="hover:text-blue-600 transition duration-300 ease-in-out mt-4">
                History
              </Link>
                </>:
                <>
                <Link to={"/login"} className=" hover:text-blue-600 transition duration-300 ease-in-out">
                Login
              </Link>
              <Link to={"/signup"} className="hover:text-blue-600 transition duration-300 ease-in-out mt-4">
                Sign up
              </Link>
                </>
              }
              
              
              <Link to={"/docs"} className="hover:text-blue-600 transition duration-300 ease-in-out mt-4">
                Docs
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
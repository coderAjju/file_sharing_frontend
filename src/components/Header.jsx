import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const [menu, setMenu] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const handleMenu = () => {
    setMenu((prev) => !prev);
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      navigate("/");
    }
  }, [])
  const handleLogout = async () => {
    // request to the server to clear the token
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {}, {
        withCredentials: true
      })
      localStorage.removeItem("token");
      navigate("/");
      toast.success(response.data.message);
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
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mx-4 hover:text-blue-600 transition duration-300 ease-in-out ${isActive ? "text-blue-600" : "text-gray-400"}`
          }
        >
          Home
        </NavLink>

        {
          token && token ?
            <>
              <NavLink to={"/login"} onClick={handleLogout} className={({ isActive }) =>
                `text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out ${isActive ? "text-blue-600" : "text-gray-400"}`
              }>
                Logout
              </NavLink>
              <NavLink to={"/history"} className={({ isActive }) =>
                `text-gray-400 ms-3 hover:text-blue-600 transition duration-300 ease-in-out ${isActive ? "text-blue-600" : "text-gray-400"}`
              }>
                History
              </NavLink>
            </>
            : <>
              <NavLink to={"/login"} className={({ isActive }) =>
                `text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out  ${isActive ? "text-blue-600" : "text-gray-400"}`
              }>
                Login
              </NavLink>
              <NavLink to={"/signup"} className={({ isActive }) =>
                `text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out ml-4 ${isActive ? "text-blue-600" : "text-gray-400"}`
              }>
                Sign Up
              </NavLink>
            </>
        }

        
        <NavLink to={"/docs"} className={({ isActive }) =>
          `hover:text-blue-600 transition duration-300 ease-in-out ml-4 ${isActive ? "text-blue-600" : "text-gray-400"}`
        }>
          Docs
        </NavLink>
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
              <NavLink to={"/"} className={({ isActive }) =>
                `hover:text-blue-600 mb-4 transition duration-300 ease-in-out ${isActive ? "text-blue-600" : "text-gray-400"}`
              }>
                Home
              </NavLink>
              {
                token && token ?
                  <>
                    <NavLink onClick={handleLogout} to={"/login"} className={({ isActive }) =>
                      ` hover:text-blue-600 transition duration-300 ease-in-out ${isActive ? "text-blue-600" : "text-gray-400"}`
                    }>
                      Logout
                    </NavLink>
                    <NavLink to={"/history"} className={({ isActive }) =>
                      `hover:text-blue-600 transition duration-300 ease-in-out mt-4 ${isActive ? "text-blue-600" : "text-gray-400"}`
                    }>
                      History
                    </NavLink>
                  </> :
                  <div className="flex flex-col gap-4">
                    <NavLink to={"/login"} className={({ isActive }) =>
                      `hover:text-blue-600 transition duration-300 ease-in-out ${isActive ? "text-blue-600" : "text-gray-400"}`
                    }>
                      Login
                    </NavLink>
                    <NavLink to={"/signup"} className={({ isActive }) =>
                      `hover:text-blue-600 transition duration-300 ease-in-out ${isActive ? "text-blue-600" : "text-gray-400"}`
                    }>
                      Sign up
                    </NavLink>
                  </div>
              }

              <NavLink to={"/docs"} className={({ isActive }) =>
                      `hover:text-blue-600 transition duration-300 ease-in-out mt-4 ${isActive ? "text-blue-600" : "text-gray-400"}`
                    }>
                Docs
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
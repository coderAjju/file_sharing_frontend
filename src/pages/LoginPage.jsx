import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const [LoginBtnClicked,setLoginBtnClicked] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoginBtnClicked(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData,{
        withCredentials: true
      });
      toast.success("Login successful")
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("loginTimestamp",Date.now());
      localStorage.setItem("expiresAt",Date.now() + 1000 * 60);
      setLoginBtnClicked(false);
      navigate("/");
      } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      }
    };

  return (
   <>
   <Header/>
   <div className="min-h-[80vh] flex p-3 sm:p-0
    items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {LoginBtnClicked ? <div className='loaderCSS mx-auto'></div> : "Login"}
          </button>
          <span className='block text-center mt-2 text-white text-sm sm:text-[17px]'>Don't have an account? <Link to={"/signup"} className='text-blue-400'>Signup</Link></span>
        </form>
      </div>
    </div>
   <Footer/>
   </>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [RegisterBtnClicked, setRegisterBtnClicked] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
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
      setRegisterBtnClicked(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, formData,{
        withCredentials: true
      });
      toast.success(response.data.message);
      setRegisterBtnClicked(false);
      navigate("/login");
      } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      }
    };

  return (
    <>
        <Header/>
    <div className="min-h-screen p-3 sm:p-0 flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Register</h2>
        
        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="
            block text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

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
            {RegisterBtnClicked ? <div className='loaderCSS mx-auto'></div> : "Register"}
          </button>
          <span className='block text-center mt-2 text-white text-sm sm:text-[17px]'>Already have an account? <Link to={"/login"} className='text-blue-400'>Login</Link></span>

        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default RegistrationForm;

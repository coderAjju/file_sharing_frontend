import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-6 pb-6">
      <div className="container mx-auto px-4">
        {/* Brand Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-200 tracking-wide">FileShare</h2>
          <p className="text-lg text-gray-400 mt-2 max-w-md mx-auto">
            Share your images and videos with ease, speed, and security.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="#"
            className="transform hover:scale-125 transition-transform duration-300 text-gray-400 hover:text-blue-500"
          >
            <FaFacebookF size={28} />
          </a>
          <a
            href="#"
            className="transform hover:scale-125 transition-transform duration-300 text-gray-400 hover:text-blue-400"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="#"
            className="transform hover:scale-125 transition-transform duration-300 text-gray-400 hover:text-pink-500"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="#"
            className="transform hover:scale-125 transition-transform duration-300 text-gray-400 hover:text-indigo-500"
          >
            <FaLinkedin size={28} />
          </a>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center space-x-8 mb-8">
          <a
            href="#"
            className="text-gray-400 hover:text-indigo-500 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-indigo-500 transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-indigo-500 transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-indigo-500 transition-colors duration-300"
          >
            Privacy Policy
          </a>
        </div>

        {/* Newsletter Section */}
        <div className="text-center mb-8">
          <h3 className="text-lg text-gray-200 mb-4">Stay Updated!</h3>
          <form className="flex justify-center items-center gap-4 sm:gap-0 flex-col sm:flex-row space-x-4">
            <input
              type="email"
              className="w-64 p-3 rounded-lg bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center text-gray-500 text-sm">
          <p>&copy; 2024 FileShare. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">
            Built by <b className="text-gray-300">CoderAjju</b></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

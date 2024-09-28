import React, { useState } from 'react';

function Header() {
    const [menu, setMenu] = useState(false);
    const handleMenu = () => {
        setMenu((prev)=>!prev);
    };
  return (
    <nav className="flex justify-between items-center py-4 px-2 md:px-10  md:py-6 lg:py-8">
      <div className="flex items-center">
        <img src="/assets/logo.png" className='w-36' alt="" />
      </div>
      <div className="hidden md:flex items-center gap-5">
        <a href="#" className="text-gray-400 hover:text-white transition duration-300 ease-in-out">
          Features
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition duration-300 ease-in-out ml-4">
          Pricing
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition duration-300 ease-in-out ml-4">
          About
        </a>
      </div>
      <div className="md:hidden flex items-center">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleMenu}
        >
        {menu?"Close":"Menu"}
        </button> 
        {/* // creating menu bar for mobile view */}
        {menu && (
          <div className=" sm:w-full absolute border-2 top-20 right-0 w-full max-w-xs shadow-md rounded-lg">
            <div className="py-4 px-6 flex flex-col text-gray-400">
              <a href="#" className=" hover:text-white transition duration-300 ease-in-out">
                Features
              </a>
              <a href="#" className="hover:text-white transition duration-300 ease-in-out mt-4">
                Pricing
              </a>
              <a href="#" className="hover:text-white transition duration-300 ease-in-out mt-4">
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
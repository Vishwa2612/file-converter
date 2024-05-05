'use client';

import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-black text-white border border-gray-800 border-t-0 border-l-0 border-r-0 py-4 md:flex md:flex-row items-center justify-around fixed w-full">
      <div className="container mx-auto flex  items-center justify-between px-4">
        <div>
          <h1 className="text-4xl font-bold text-green-500">CONVERTER</h1>
        </div>
        <div className="md:hidden">
          <button type="button" className="text-white" title="menu" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <nav className={`text-center md:text-right ${showMenu ? 'block' : 'hidden'} md:block`}>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mr-5">
          <li><a href="#" className="hover:text-blue-500">Home</a></li>
          <li><a href="#" className="hover:text-blue-500">About</a></li>
          <li><a href="#" className="hover:text-blue-500">Login</a></li>
          <li><a href="#" className="hover:text-blue-500">Help</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Hero;
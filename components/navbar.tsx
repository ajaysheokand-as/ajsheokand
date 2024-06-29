"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-purple-600 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">
            AjAy SHEOKAND
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/projects" className="hover:text-gray-400">
           Projects
          </Link>
          <Link href="/quiz" className="hover:text-gray-400">
           MCQ
          </Link>
          <Link href="/contact" className="hover:text-gray-400">
           Contact
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-700">
         Home
        </Link>
        <Link href="/about" className="block px-4 py-2 text-sm hover:bg-gray-700">
          About
        </Link>
        <Link href="/contact" className="block px-4 py-2 text-sm hover:bg-gray-700">
         Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

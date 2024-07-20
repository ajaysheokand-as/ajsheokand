'use client'
import React, { useState } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
//   const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="lg:hidden p-4 bg-white text-white fixed top-0 left-0"
        onClick={toggleSidebar}
      >
        Menu
      </button>
      <div
        className={`bg-gray-900 text-white w-64 lg:block fixed lg:relative transform min-h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 lg:translate-x-0 h-full flex flex-col z-50`}
      >
        <h2 className="text-3xl font-bold p-6 border-b border-gray-700">
          Admin Panel
        </h2>
        <nav className="flex-1 mt-4">
          <ul>
            <li
              className={`mb-2`}
            >
              <Link href="/pages/admin/students">
                <div className="p-4 text-white hover:bg-gray-700 transition duration-300 cursor-pointer">
                  MCQ 
                </div>
              </Link>
            </li>
            <li
              className={`mb-2 `}
            >
              <Link href="/pages/admin/quiz">
                <div className="p-4 text-white hover:bg-gray-700 transition duration-300 cursor-pointer">
                  Quiz 
                </div>
              </Link>
            </li>
            <li
              className={`mb-2 `}
            >
              <Link href="/admin/results">
                <div className="p-4 text-white hover:bg-gray-700 transition duration-300 cursor-pointer">
                  Typing Test 
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
// components/Header.tsx
import React from 'react';
import Image from 'next/image'

const Home: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          {/* <img
            src="https://via.placeholder.com/256x256"
            alt="Profile Picture"
            className="w-64 h-64 rounded-full object-cover"
          /> */}
          <Image
            src="https://via.placeholder.com/256x256"
            alt="Profile Picture"
            className="w-64 h-64 rounded-full object-cover"
            />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-4xl font-bold text-teal-600 mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            {`Hi, I'm John Doe, a passionate web developer with a focus on creating
            modern and responsive web applications.`}
          </p>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition duration-300">
            View My Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
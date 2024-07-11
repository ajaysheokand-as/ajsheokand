// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
      <div className="container mx-auto text-center text-white">
        &copy; {new Date().getFullYear()} My Personal Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

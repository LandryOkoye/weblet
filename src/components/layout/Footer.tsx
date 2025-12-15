import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Web3 Wallet Project. All rights reserved.
        </p>
        <div className="mt-2 text-xs text-gray-500">
          Built with React, TypeScript & Ethers.js
        </div>
      </div>
    </footer>
  );
};

export default Footer;

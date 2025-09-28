
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#1C1B1F]/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20 border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <i className="fa-solid fa-table-list text-3xl text-[#D0BCFF]"></i>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 tracking-tight">
              AI Model API Matrix
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

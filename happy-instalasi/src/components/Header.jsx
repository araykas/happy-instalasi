import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-sky-600 to-sky-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Happy Instalasi</h1>
              <p className="text-sky-100 text-sm">AI-Powered Installation Assistant</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="bg-sky-700 px-3 py-1 rounded-full text-sm">v1.0.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

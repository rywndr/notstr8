'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, Menu, X } from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-neutral-200 shadow-xl rounded-xl my-4 mx-auto w-11/12 md:w-3/4 lg:w-2/3 xl:max-w-4xl">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-neutral-700 mr-2 sm:mr-3" />
          <span className="font-extrabold text-2xl sm:text-3xl text-neutral-800 hover:text-neutral-900 transition-colors">
            notstr8
          </span>
        </Link>

        {/* Main Menu */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/" className="text-neutral-600 hover:text-neutral-900 transition-all duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium transform hover:scale-105">
            Home
          </Link>
          <Link href="/dashboard" className="text-neutral-600 hover:text-neutral-900 transition-all duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium transform hover:scale-105">
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Btn */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-neutral-600 hover:text-neutral-900 focus:outline-none focus:text-neutral-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-200 rounded-b-xl shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all duration-200 ease-in-out px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="block text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all duration-200 ease-in-out px-3 py-2 rounded-md text-base font-medium">
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
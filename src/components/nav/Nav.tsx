'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import AuthButton from '../auth/AuthButton';
import { useAuth, AuthUser } from '../../hooks/useAuth';
import { MobileProfileSection } from './MobileProfileSection';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;

  const handleNavigate = () => {
    setIsOpen(false);
  };

  // Extract user name from user metadata or email
  const getUserName = (user: AuthUser) => {
    return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || "User";
  };

  return (
    <nav className="bg-neutral-100 shadow-xl rounded-xl my-4 max-w-7xl mx-4 sm:mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="font-extrabold text-2xl sm:text-3xl text-neutral-800 hover:text-neutral-900 transition-colors">
            DAKOMRI
          </span>
        </Link>

        {/* Main Menu */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/" className={`transition-all duration-300 ease-in-out px-3 py-2 rounded-md text-base font-semibold transform hover:scale-105 ${
            isActive('/') 
              ? 'text-slate-700 bg-slate-100 border-b-2 border-slate-700 shadow-sm' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}>
            Home
          </Link>
          
          <Link href="/dashboard" className={`transition-all duration-300 ease-in-out px-3 py-2 rounded-md text-base font-semibold transform hover:scale-105 ${
            isActive('/dashboard') 
              ? 'text-slate-700 bg-slate-100 border-b-2 border-slate-700 shadow-sm' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}>
            Dashboard
          </Link>
          
          <Link href="/form" className={`transition-all duration-300 ease-in-out px-3 py-2 rounded-md text-base font-semibold transform hover:scale-105 ${
            isActive('/form') 
              ? 'text-slate-700 bg-slate-100 border-b-2 border-slate-700 shadow-sm' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}>
            Form
          </Link>
          
          {user?.role === 'ADMIN' && (
            <Link href="/admin" className={`transition-all duration-300 ease-in-out px-3 py-2 rounded-md text-base font-semibold transform hover:scale-105 ${
              isActive('/admin') 
                ? 'text-slate-700 bg-slate-100 border-b-2 border-slate-700 shadow-sm' 
              : 'text-neutral-600 hover:text-neutral-900'
            }`}>
              Admin
            </Link>
          )}
          
          <AuthButton />
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
        <div className="md:hidden bg-neutral-100 rounded-b-xl shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={`block transition-all duration-200 ease-in-out px-3 py-2 rounded-md text-lg font-semibold ${
              isActive('/') 
                ? 'text-slate-700 bg-slate-100 border-l-4 border-slate-700 shadow-sm' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300'
            }`} onClick={handleNavigate}>
              Home
            </Link>
            
            <Link href="/dashboard" className={`block transition-all duration-200 ease-in-out px-3 py-2 rounded-md text-lg font-semibold ${
              isActive('/dashboard') 
                ? 'text-slate-700 bg-slate-100 border-l-4 border-slate-700 shadow-sm' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300'
            }`} onClick={handleNavigate}>
              Dashboard
            </Link>
            
            <Link href="/form" className={`block transition-all duration-200 ease-in-out px-3 py-2 rounded-md text-lg font-semibold ${
              isActive('/form') 
                ? 'text-slate-700 bg-slate-100 border-l-4 border-slate-700 shadow-sm' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300'
            }`} onClick={handleNavigate}>
              Form
            </Link>
            
            {user?.role === 'ADMIN' && (
              <Link href="/admin" className={`block transition-all duration-200 ease-in-out px-3 py-2 rounded-md text-lg font-semibold ${
                isActive('/admin') 
                  ? 'text-slate-700 bg-slate-100 border-l-4 border-slate-700 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300'
              }`} onClick={handleNavigate}>
                Admin
              </Link>
            )}

            {/* Mobile Auth Section */}
            {user ? (
              <MobileProfileSection 
                user={user} 
                userName={getUserName(user)}
                onNavigate={handleNavigate} 
              />
            ) : (
              <div className="px-3 py-2 border-t border-gray-200 mt-2">
                <AuthButton />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
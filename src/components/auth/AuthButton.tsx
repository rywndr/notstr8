"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { User, ChevronDown, LogOut, Edit, FileCheck, Inbox, Clock, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createClientSupabaseClient } from "@/lib/supabase/client";

export default function AuthButton() {
  const { user, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    const supabase = createClientSupabaseClient();
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="hidden sm:block w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-md transition-colors duration-200 text-sm sm:text-base"
      >
        <span className="hidden sm:inline">Sign-in</span>
        <span className="sm:hidden">Sign-in</span>
      </Link>
    );
  }

  // Extract user name from user metadata or email
  const userName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || "User";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors duration-200"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
        </div>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {userName}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user.email}
                </div>
                {user.role === "ADMIN" && (
                  <div className="mt-1">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Administrator
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          {user.role !== "ADMIN" && (
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status Formulir:</span>
                {user.hasSubmittedForm ? (
                  <Link
                    href="/form/edit"
                    className="inline-flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FileCheck className="w-3 h-3" />
                    <span>Terdaftar</span>
                  </Link>
                ) : user.submissionStatus === 'PENDING_REVIEW' ? (
                  <span className="inline-flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                    <Clock className="w-3 h-3" />
                    <span>Menunggu Verifikasi</span>
                  </span>
                ) : user.submissionStatus === 'REJECTED' ? (
                  <span className="inline-flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-red-700">
                    <X className="w-3 h-3" />
                    <span>Ditolak</span>
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-50 text-yellow-700">
                    Belum Dikirim
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="py-2">
            {user.role === "ADMIN" && (
              <Link
                href="/admin/pending"
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Inbox className="w-4 h-4" />
                <span>Inbox</span>
              </Link>
            )}

            {user.role !== "ADMIN" && user.hasSubmittedForm && (
              <Link
                href="/form/edit"
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Edit className="w-4 h-4" />
                <span>Edit Formulir</span>
              </Link>
            )}

            {user.role !== "ADMIN" && (user.submissionStatus === 'NOT_SUBMITTED' || user.submissionStatus === 'REJECTED') && (
              <Link
                href="/form"
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Edit className="w-4 h-4" />
                <span>{user.submissionStatus === 'REJECTED' ? 'Kirim Ulang Formulir' : 'Isi Formulir'}</span>
              </Link>
            )}

            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

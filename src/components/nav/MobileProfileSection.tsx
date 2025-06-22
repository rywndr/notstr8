'use client'

import React from 'react';
import Link from 'next/link';
import { User, LogOut, Edit, FileCheck, Inbox, Clock, X } from 'lucide-react';
import { createClientSupabaseClient } from '@/lib/supabase/client';
import { AuthUser } from '@/hooks/useAuth';

interface MobileProfileSectionProps {
  user: AuthUser;
  userName: string;
  onNavigate: () => void;
}

export function MobileProfileSection({ user, userName, onNavigate }: MobileProfileSectionProps) {
  const handleSignOut = async () => {
    const supabase = createClientSupabaseClient();
    await supabase.auth.signOut();
    onNavigate();
  };

  return (
    <div className="px-3 py-2 border-t border-gray-200 mt-2">
      {/* User info */}
      <div className="flex items-center space-x-3 py-3">
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

      {/* Status */}
      {user.role !== "ADMIN" && (
        <div className="py-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Status Formulir:</span>
            {user.hasSubmittedForm ? (
              <Link
                href="/form/edit"
                className="inline-flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                onClick={onNavigate}
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
                Belum Dikirimm
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="py-2 border-t border-gray-100 space-y-1">
        {user.role === "ADMIN" && (
          <Link
            href="/admin/pending"
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            onClick={onNavigate}
          >
            <Inbox className="w-4 h-4" />
            <span>Inbox</span>
          </Link>
        )}

        {user.role !== "ADMIN" && user.hasSubmittedForm && (
          <Link
            href="/form/edit"
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            onClick={onNavigate}
          >
            <Edit className="w-4 h-4" />
            <span>Edit Formulir</span>
          </Link>
        )}

        {user.role !== "ADMIN" && (user.submissionStatus === 'NOT_SUBMITTED' || user.submissionStatus === 'REJECTED') && (
          <Link
            href="/form"
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            onClick={onNavigate}
          >
            <Edit className="w-4 h-4" />
            <span>{user.submissionStatus === 'REJECTED' ? 'Kirim Ulang Formulir' : 'Isi Formulir'}</span>
          </Link>
        )}

        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

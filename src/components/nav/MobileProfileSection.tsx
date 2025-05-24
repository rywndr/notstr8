'use client'

import Link from 'next/link'
import { User, LogOut } from 'lucide-react'
import { createClientSupabaseClient } from '@/lib/supabase/client'

interface MobileProfileSectionProps {
  user: {
    id: string
    email: string
    name?: string | null
    role: string
    hasSubmittedForm: boolean
  }
  onNavigate: () => void
}

export function MobileProfileSection({ user, onNavigate }: MobileProfileSectionProps) {
  const handleSignOut = async () => {
    try {
      const supabase = createClientSupabaseClient()
      
      if (!supabase) {
        console.error('Supabase client not available')
        onNavigate()
        window.location.href = '/'
        return
      }

      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Supabase sign out error:', error)
      }
      
      onNavigate() // Close mobile menu
      
      // Force reload to clear all state and redirect to home
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
      // Fallback: still close menu and redirect
      onNavigate()
      window.location.href = '/'
    }
  }

  return (
    <>
      {/* User Info */}
      <div className="px-3 py-2 border-t border-gray-200 mt-2">
        <div className="flex items-center gap-3 py-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">{user.name || 'User'}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
      </div>

      {/* Status Info, Only show for non-admin users */}
      {user.role !== 'ADMIN' && (
        <div className="px-3 py-2 border-t border-gray-100">
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-gray-500">Status Formulir:</span>
            {user.hasSubmittedForm ? (
              <Link 
                href="/form/edit"
                className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                onClick={onNavigate}
              >
                Sudah Dikirim (Edit)
              </Link>
            ) : (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-50 text-yellow-700">
                Belum Dikirim
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sign Out Btn */}
      <div className="px-3 py-2 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  )
}

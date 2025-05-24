'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { LogOut, User, ChevronDown, Shield } from 'lucide-react'
import Link from 'next/link'

export default function UserDropdown() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    setIsOpen(false)
    window.location.href = '/'
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {/* User Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.email}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {user.role === 'ADMIN' ? 'Administrator' : 'User'}
                  </span>
                  {user.role === 'ADMIN' && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                      <Shield className="w-3 h-3" />
                      <span className="text-xs font-medium">Admin</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status Info - Only show for non-admin users */}
          {user.role !== 'ADMIN' && (
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status Formulir:</span>
                {user.hasSubmittedForm ? (
                  <Link 
                    href="/form/edit"
                    className={`text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors cursor-pointer`}
                    onClick={() => setIsOpen(false)}
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

          {/* Actions */}
          <div className="px-2 py-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

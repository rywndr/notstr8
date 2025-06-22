'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Clock, User, Edit, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { ChangeLog } from '../../../prisma/app/generated/prisma'
import { formatDateTime } from '@/utils/formHandlers'

interface ChangeHistoryClientProps {
  memberName: string
  changeLogs: (ChangeLog & {
    member: {
      firstName: string
      middleName: string | null
      lastName: string | null
    }
    changedBy: {
      name: string | null
      email: string
      role: string
    }
  })[]
}

export function ChangeHistoryClient({ memberName, changeLogs }: ChangeHistoryClientProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatLogDateTime = (date: Date | string) => {
    return formatDateTime(date, mounted)
  }

  const formatChangedBy = (log: ChangeHistoryClientProps['changeLogs'][0]) => {
    const userName = log.changedBy?.name || log.changedByName || 'Unknown User'
    const userRole = log.changedBy?.role
    
    if (userRole === 'ADMIN') {
      return `${userName} (admin)`
    }
    return userName
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE': return <Plus className="w-4 h-4 text-green-600" />
      case 'UPDATE': return <Edit className="w-4 h-4 text-blue-600" />
      case 'DELETE': return <Trash className="w-4 h-4 text-red-600" />
      default: return <Edit className="w-4 h-4 text-gray-600" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-green-100 text-green-800'
      case 'UPDATE': return 'bg-blue-100 text-blue-800'
      case 'DELETE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatFieldName = (fieldName: string) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  return (
    <>
      <div className="mb-6">
        <Link 
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Admin
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Riwayat Perubahan</h1>
        <p className="text-gray-600 mt-2">Riwayat perubahan untuk: <strong>{memberName}</strong></p>
      </div>

      {changeLogs.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada riwayat perubahan</h3>
          <p className="text-gray-600">Belum ada perubahan yang tercatat untuk member ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {changeLogs.map((log) => (
            <div key={log.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getActionIcon(log.action)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatFieldName(log.fieldName)}
                      </span>
                    </div>
                    
                    {log.action === 'UPDATE' && (
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-gray-500">Dari:</span>
                          <div className="bg-red-50 border border-red-200 rounded px-3 py-2 text-sm text-red-800 mt-1">
                            {log.oldValue || '-'}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Ke:</span>
                          <div className="bg-green-50 border border-green-200 rounded px-3 py-2 text-sm text-green-800 mt-1">
                            {log.newValue || '-'}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {log.action === 'CREATE' && (
                      <div>
                        <span className="text-xs text-gray-500">Nilai:</span>
                        <div className="bg-green-50 border border-green-200 rounded px-3 py-2 text-sm text-green-800 mt-1">
                          {log.newValue || '-'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Diubah oleh: <strong>{formatChangedBy(log)}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatLogDateTime(log.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
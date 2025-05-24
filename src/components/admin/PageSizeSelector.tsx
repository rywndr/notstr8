'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface PageSizeSelectorProps {
  currentPageSize: number
}

export function PageSizeSelector({ currentPageSize }: PageSizeSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageSizeChange = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('pageSize', newPageSize.toString())
    params.set('page', '1') // Reset to first page when changing page size
    router.push(`/admin?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-xs sm:text-sm text-slate-600 whitespace-nowrap">
        <span className="hidden sm:inline">Per halaman:</span>
        <span className="sm:hidden">Show:</span>
      </label>
      <select
        id="pageSize"
        value={currentPageSize}
        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        className="px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white transition-all"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  )
}

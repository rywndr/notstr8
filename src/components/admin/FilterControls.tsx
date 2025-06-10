'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, X, Tag } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

interface FilterControlsProps {
  initialSearchQuery: string
  initialBpjsStatus: string
  initialSocialAssistanceStatus: string
  initialEducationLevel: string
  initialEmploymentStatus: string
}

export function FilterControls({
  initialSearchQuery,
  initialBpjsStatus,
  initialSocialAssistanceStatus,
  initialEducationLevel,
  initialEmploymentStatus
}: FilterControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [bpjsStatus, setBpjsStatus] = useState(initialBpjsStatus)
  const [socialAssistanceStatus, setSocialAssistanceStatus] = useState(initialSocialAssistanceStatus)
  const [educationLevel, setEducationLevel] = useState(initialEducationLevel)
  const [employmentStatus, setEmploymentStatus] = useState(initialEmploymentStatus)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (debouncedSearchQuery) {
      params.set('search', debouncedSearchQuery)
    } else {
      params.delete('search')
    }
    
    if (bpjsStatus !== 'all') {
      params.set('bpjs', bpjsStatus)
    } else {
      params.delete('bpjs')
    }
    
    if (socialAssistanceStatus !== 'all') {
      params.set('social', socialAssistanceStatus)
    } else {
      params.delete('social')
    }
    
    if (educationLevel !== 'all') {
      params.set('education', educationLevel)
    } else {
      params.delete('education')
    }
    
    if (employmentStatus !== 'all') {
      params.set('employment', employmentStatus)
    } else {
      params.delete('employment')
    }
    
    params.set('page', '1') // Reset to first page
    router.push(`/admin?${params.toString()}`)
  }, [debouncedSearchQuery, bpjsStatus, socialAssistanceStatus, educationLevel, employmentStatus, router, searchParams])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const clearSearch = () => {
    setSearchQuery('')
  }

  const clearDropdownFilters = () => {
    setBpjsStatus('all')
    setSocialAssistanceStatus('all')
    setEducationLevel('all')
    setEmploymentStatus('all')
  }

  const hasActiveDropdownFilters = bpjsStatus !== 'all' || socialAssistanceStatus !== 'all' || educationLevel !== 'all' || employmentStatus !== 'all'

  const getFilterLabel = (type: string, value: string) => {
    switch (type) {
      case 'bpjs':
        return value === 'true' ? 'Memiliki BPJS' : 'Tidak Memiliki BPJS'
      case 'social':
        return value === 'true' ? 'Menerima Bantuan' : 'Tidak Menerima Bantuan'
      case 'education':
        const educationLabels: { [key: string]: string } = {
          'SD': 'SD',
          'SMP': 'SMP',
          'SMA_SMK': 'SMA/SMK',
          'PERGURUAN_TINGGI': 'Perguruan Tinggi',
          'TIDAK_SEKOLAH': 'Tidak Sekolah'
        }
        return educationLabels[value] || value
      case 'employment':
        const employmentLabels: { [key: string]: string } = {
          'BEKERJA': 'Bekerja',
          'TIDAK_BEKERJA': 'Tidak Bekerja',
          'PELAJAR': 'Pelajar',
          'MAHASISWA': 'Mahasiswa'
        }
        return employmentLabels[value] || value
      default:
        return value
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">Filter & Pencarian</h3>
      </div>
      
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari nama, NIK, atau KK..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status BPJS</label>
            <select
              value={bpjsStatus}
              onChange={(e) => setBpjsStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-sm"
            >
              <option value="all">Semua</option>
              <option value="true">Memiliki BPJS</option>
              <option value="false">Tidak Memiliki BPJS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bantuan Sosial</label>
            <select
              value={socialAssistanceStatus}
              onChange={(e) => setSocialAssistanceStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-sm"
            >
              <option value="all">Semua</option>
              <option value="true">Menerima</option>
              <option value="false">Tidak Menerima</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan</label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-sm"
            >
              <option value="all">Semua</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA_SMK">SMA/SMK</option>
              <option value="PERGURUAN_TINGGI">Perguruan Tinggi</option>
              <option value="TIDAK_SEKOLAH">Tidak Sekolah</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
            <select
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-sm"
            >
              <option value="all">Semua</option>
              <option value="BEKERJA">Bekerja</option>
              <option value="TIDAK_BEKERJA">Tidak Bekerja</option>
              <option value="PELAJAR">Pelajar</option>
              <option value="MAHASISWA">Mahasiswa</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || hasActiveDropdownFilters) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Filter Aktif:
            </span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md">
                Pencarian: &quot;{searchQuery}&quot;
                <button onClick={clearSearch} className="hover:text-blue-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {bpjsStatus !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-md">
                BPJS: {getFilterLabel('bpjs', bpjsStatus)}
              </span>
            )}
            
            {socialAssistanceStatus !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-md">
                Bantuan: {getFilterLabel('social', socialAssistanceStatus)}
              </span>
            )}
            
            {educationLevel !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-md">
                Pendidikan: {getFilterLabel('education', educationLevel)}
              </span>
            )}
            
            {employmentStatus !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-100 text-cyan-800 text-xs font-medium rounded-md">
                Pekerjaan: {getFilterLabel('employment', employmentStatus)}
              </span>
            )}
            
            {hasActiveDropdownFilters && (
              <button
                onClick={clearDropdownFilters}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md transition-colors"
              >
                <X className="w-3 h-3" />
                Hapus Filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

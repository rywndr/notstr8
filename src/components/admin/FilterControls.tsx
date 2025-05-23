'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';

interface FilterControlsProps {
  initialSearchQuery: string;
  initialBpjsStatus: string;
  initialSocialAssistanceStatus: string;
  initialEducationLevel: string;
  initialEmploymentStatus: string;
}

export function FilterControls({
  initialSearchQuery,
  initialBpjsStatus,
  initialSocialAssistanceStatus,
  initialEducationLevel,
  initialEmploymentStatus
}: FilterControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Close dropdown on scroll
  useEffect(() => {
    function handleScroll() {
      setOpenDropdown(null);
    }

    if (openDropdown) {
      document.addEventListener('scroll', handleScroll, true);
      return () => document.removeEventListener('scroll', handleScroll, true);
    }
  }, [openDropdown]);

  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // Reset to page 1 when filters change
    params.delete('page');
    
    router.push(`/admin?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchQuery });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    updateFilters({ [filterType]: value });
    setOpenDropdown(null);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    router.push('/admin');
  };

  const hasActiveFilters = initialSearchQuery !== '' || 
    initialBpjsStatus !== 'all' || 
    initialSocialAssistanceStatus !== 'all' || 
    initialEducationLevel !== 'all' || 
    initialEmploymentStatus !== 'all';

  const DropdownButton = ({ 
    label, 
    value, 
    options, 
    filterKey 
  }: { 
    label: string; 
    value: string; 
    options: { value: string; label: string }[]; 
    filterKey: string; 
  }) => (
    <div className="relative" ref={el => { dropdownRefs.current[filterKey] = el; }}>
      <button
        type="button"
        onClick={() => setOpenDropdown(openDropdown === filterKey ? null : filterKey)}
        className={`inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
          value !== 'all' ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : ''
        }`}
      >
        {label}: {options.find(opt => opt.value === value)?.label || 'Semua'}
        <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {openDropdown === filterKey && (
        <div className="absolute z-10 mt-1 w-56 bg-white border border-slate-200 rounded-md shadow-lg">
          <div className="py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleFilterChange(filterKey, option.value)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 ${
                  value === option.value ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Filter className="h-5 w-5 text-slate-600" />
        <h3 className="text-lg font-medium text-slate-800">Filter & Pencarian</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center text-sm text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4 mr-1" />
            Hapus Semua Filter
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, NIK, atau KK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cari
          </button>
        </form>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          <DropdownButton
            label="BPJS"
            value={initialBpjsStatus}
            filterKey="bpjs"
            options={[
              { value: 'all', label: 'Semua' },
              { value: 'true', label: 'Memiliki' },
              { value: 'false', label: 'Tidak Memiliki' }
            ]}
          />

          <DropdownButton
            label="Bantuan Sosial"
            value={initialSocialAssistanceStatus}
            filterKey="social"
            options={[
              { value: 'all', label: 'Semua' },
              { value: 'true', label: 'Menerima' },
              { value: 'false', label: 'Tidak Menerima' }
            ]}
          />

          <DropdownButton
            label="Pendidikan"
            value={initialEducationLevel}
            filterKey="education"
            options={[
              { value: 'all', label: 'Semua' },
              { value: 'SD', label: 'SD' },
              { value: 'SMP', label: 'SMP' },
              { value: 'SMA_SMK', label: 'SMA/SMK' },
              { value: 'PERGURUAN_TINGGI', label: 'Perguruan Tinggi' },
              { value: 'TIDAK_SEKOLAH', label: 'Tidak Sekolah' }
            ]}
          />

          <DropdownButton
            label="Pekerjaan"
            value={initialEmploymentStatus}
            filterKey="employment"
            options={[
              { value: 'all', label: 'Semua' },
              { value: 'BEKERJA', label: 'Bekerja' },
              { value: 'TIDAK_BEKERJA', label: 'Tidak Bekerja' },
              { value: 'PELAJAR', label: 'Pelajar' },
              { value: 'MAHASISWA', label: 'Mahasiswa' }
            ]}
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PageSizeSelectorProps {
  currentPageSize: number;
}

export function PageSizeSelector({ currentPageSize }: PageSizeSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageSizeOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on scroll
  useEffect(() => {
    function handleScroll() {
      setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('scroll', handleScroll, true);
      return () => document.removeEventListener('scroll', handleScroll, true);
    }
  }, [isOpen]);

  const handlePageSizeChange = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', value.toString());
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-slate-600">Tampilkan</span>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center px-3 py-1 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-[64px] justify-between"
        >
          {currentPageSize}
          <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-16 bg-white border border-slate-200 rounded-md shadow-lg">
            <div className="py-1 max-h-60 overflow-y-auto">
              {pageSizeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handlePageSizeChange(option.value)}
                  className={`block w-full text-center px-3 py-2 text-sm hover:bg-slate-100 ${
                    currentPageSize === option.value ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <span className="text-sm text-slate-600">per halaman</span>
    </div>
  );
}

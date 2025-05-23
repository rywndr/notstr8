'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { Search, Filter as FilterIcon, XCircle, ShieldCheck, Handshake, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';

interface FilterControlsProps {
  initialSearchQuery?: string;
  initialBpjsStatus?: string;
  initialSocialAssistanceStatus?: string;
}

export default function FilterControls({
  initialSearchQuery = '',
  initialBpjsStatus = 'all',
  initialSocialAssistanceStatus = 'all',
}: FilterControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [bpjsStatus, setBpjsStatus] = useState(initialBpjsStatus);
  const [socialAssistanceStatus, setSocialAssistanceStatus] = useState(initialSocialAssistanceStatus);

  const debouncedSearchQuery = useDebounce(searchQuery, 100);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchQuery) {
      params.set('search', debouncedSearchQuery);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchQuery, router, pathname, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (bpjsStatus !== 'all') {
      params.set('bpjs', bpjsStatus);
    } else {
      params.delete('bpjs');
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }, [bpjsStatus, router, pathname, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (socialAssistanceStatus !== 'all') {
      params.set('social', socialAssistanceStatus);
    } else {
      params.delete('social');
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }, [socialAssistanceStatus, router, pathname, searchParams]);

  const activeFilterCount =
    (bpjsStatus !== 'all' ? 1 : 0) +
    (socialAssistanceStatus !== 'all' ? 1 : 0);

  const handleClearCombinedFilters = () => {
    setBpjsStatus('all');
    setSocialAssistanceStatus('all');
  };

  const bpjsStatusText = bpjsStatus === 'all' ? 'Semua' : bpjsStatus === 'true' ? 'Ya' : 'Tidak';
  const socialAssistanceStatusText =
    socialAssistanceStatus === 'all' ? 'Semua' : socialAssistanceStatus === 'true' ? 'Ya' : 'Tidak';

  return (
    <div className="mb-8 p-6 bg-white shadow-md rounded-lg border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* ... Search Input ... */}
          <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">
            Cari Anggota
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="search"
              type="text"
              placeholder="Nama, NIK, atau No. KK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-slate-50 border-slate-300 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
        </div>
        
        <div className="flex items-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-full md:w-auto border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 focus:ring-slate-500 focus:border-slate-500"
              >
                <FilterIcon className="mr-2 h-4 w-4" />
                Filters {activeFilterCount > 0 && <span className="ml-1.5 bg-slate-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white" align="end">
              <DropdownMenuLabel className="font-semibold text-slate-800">Filter Options</DropdownMenuLabel>
            
              <DropdownMenuSeparator className="bg-slate-200" />

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-slate-700">
                    <ShieldCheck className={`mr-2 h-4 w-4 ${bpjsStatus !== 'all' ? 'text-sky-600' : 'opacity-50'}`} />
                    <span>Status BPJS: <span className="font-medium text-sky-700">{bpjsStatusText}</span></span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="bg-white p-2">
                      <DropdownMenuRadioGroup value={bpjsStatus} onValueChange={setBpjsStatus}>
                        <DropdownMenuRadioItem value="all" className="text-slate-600 hover:!bg-slate-100">
                          <ShieldCheck className="mr-2 h-4 w-4 opacity-40" /> Semua Status
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="true" className="text-slate-600 hover:!bg-slate-100">
                          <ShieldCheck className="mr-2 h-4 w-4 text-green-500" /> Memiliki BPJS
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="false" className="text-slate-600 hover:!bg-slate-100">
                          <ShieldCheck className="mr-2 h-4 w-4 text-red-500" /> Tidak Memiliki BPJS
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>


                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-slate-700">
                    <Handshake className={`mr-2 h-4 w-4 ${socialAssistanceStatus !== 'all' ? 'text-sky-600' : 'opacity-50'}`} />
                    <span>Bantuan Sosial: <span className="font-medium text-sky-700">{socialAssistanceStatusText}</span></span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="bg-white p-2">
                      <DropdownMenuRadioGroup value={socialAssistanceStatus} onValueChange={setSocialAssistanceStatus}>
                        <DropdownMenuRadioItem value="all" className="text-slate-600 hover:!bg-slate-100">
                          <Handshake className="mr-2 h-4 w-4 opacity-40" /> Semua Status
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="true" className="text-slate-600 hover:!bg-slate-100">
                          <Handshake className="mr-2 h-4 w-4 text-green-500" /> Menerima
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="false" className="text-slate-600 hover:!bg-slate-100">
                          <Handshake className="mr-2 h-4 w-4 text-red-500" /> Tidak Menerima
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              
              {activeFilterCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={handleClearCombinedFilters} 
                    className="text-red-600 hover:!bg-red-100 hover:!text-red-700 cursor-pointer focus:!bg-red-100 focus:!text-red-700"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Clear All Filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

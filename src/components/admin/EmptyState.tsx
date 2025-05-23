import Link from 'next/link';
import { Users, Search } from 'lucide-react';

interface EmptyStateProps {
  hasFilters?: boolean;
}

export function EmptyState({ hasFilters = false }: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-md">
      {hasFilters ? (
        <>
          <Search className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Tidak ada hasil yang ditemukan
          </h3>
          <p className="text-slate-500 mb-4">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
        </>
      ) : (
        <>
          <Users className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Belum ada data anggota
          </h3>
          <p className="text-slate-500 mb-4">
            Data anggota komunitas akan ditampilkan di sini setelah ada yang mendaftar
          </p>
          <Link 
            href="/form" 
            className="inline-block mt-6 bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Isi Formulir Sekarang
          </Link>
        </>
      )}
    </div>
  );
}

import Link from 'next/link';
import { Users } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <Users className="h-24 w-24 text-slate-300 mx-auto mb-4" />
      <p className="text-xl text-slate-500 mb-2">Belum ada data yang terdaftar</p>
      <p className="text-slate-400">Data anggota akan muncul di sini setelah formulir diisi</p>
      <Link 
        href="/form" 
        className="inline-block mt-6 bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Isi Formulir Sekarang
      </Link>
    </div>
  );
}

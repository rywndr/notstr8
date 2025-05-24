import { LucideIcon } from 'lucide-react';

interface MemberSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

export function MemberSection({ title, children, icon: Icon }: MemberSectionProps) {
  const getSectionColor = (title: string) => {
    switch(title) {
      case 'Data Kependudukan': return 'text-blue-600';
      case 'Alamat Domisili': return 'text-green-600';
      case 'Status Sosial & Ekonomi': return 'text-purple-600';
      case 'Pelatihan': return 'text-orange-600';
      case 'Informasi BPJS': return 'text-emerald-600';
      case 'Data Kesehatan': return 'text-red-600';
      case 'Pengalaman Diskriminasi/Kekerasan': return 'text-amber-600';
      case 'Bantuan Sosial & Komunitas': return 'text-cyan-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
        {Icon && <Icon className={`w-5 h-5 ${getSectionColor(title)}`} />}
        <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
      </div>
      {children}
    </div>
  );
}

import { LucideIcon } from 'lucide-react';

interface MemberSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

export function MemberSection({ title, children, icon: Icon }: MemberSectionProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
            <Icon size={16} />
          </div>
        )}
        <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
      </div>
      {children}
    </div>
  );
}

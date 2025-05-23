interface MemberSectionProps {
  title: string;
  children: React.ReactNode;
}

export function MemberSection({ title, children }: MemberSectionProps) {
  return (
    <>
      <h4 className="text-lg font-semibold text-slate-700 mt-6 mb-3 pb-2 border-b border-slate-200">
        {title}
      </h4>
      {children}
    </>
  );
}

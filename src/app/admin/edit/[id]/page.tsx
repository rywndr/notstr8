import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { EditMemberForm } from '@/components/admin/EditMemberForm';

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditMemberPage({ params }: EditPageProps) {
  const member = await prisma.communityMember.findUnique({
    where: { id: params.id }
  });

  if (!member) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Edit Member</h1>
          <p className="text-slate-600 mt-2">Update informasi anggota komunitas</p>
        </div>
        
        <EditMemberForm member={member} />
      </div>
    </div>
  );
}

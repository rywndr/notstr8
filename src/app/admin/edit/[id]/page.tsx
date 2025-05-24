import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { EditMemberForm } from '@/components/admin/EditMemberForm';

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMemberPage({ params }: EditPageProps) {
  const { id } = await params;
  
  const member = await prisma.communityMember.findUnique({
    where: { id }
  });

  if (!member) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <EditMemberForm member={member} />
      </div>
    </div>
  );
}

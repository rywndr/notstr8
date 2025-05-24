import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { EditMemberForm } from '@/components/admin/EditMemberForm';

export default async function UserEditFormPage() {
  // Server-side auth check
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  // Redirect if not authenticated
  if (error || !user) {
    redirect('/login');
  }
  
  // Get user's submitted form data
  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: {
      communityMember: true
    }
  });
  
  if (!dbUser || !dbUser.hasSubmittedForm || !dbUser.communityMember) {
    redirect('/form');
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <EditMemberForm 
          member={dbUser.communityMember} 
          isUserEdit={true} 
        />
      </div>
    </div>
  );
}

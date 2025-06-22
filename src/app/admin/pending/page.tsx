import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { PendingSubmissionsPage } from '@/components/admin/PendingSubmissionsPage';

export const dynamic = 'force-dynamic';

export default async function AdminPendingSubmissionsPage() {
  // Server-side auth check
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  // Redirect if not authenticated
  if (error || !user) {
    redirect('/login');
  }
  
  // Check if user is admin
  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  });
  
  if (!dbUser || dbUser.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PendingSubmissionsPage currentUserId={dbUser.id} />
      </div>
    </div>
  );
}

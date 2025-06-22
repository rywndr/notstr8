import { createServerSupabaseClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { CreatePostForm } from '@/components/activities/CreatePostForm'

export default async function CreatePostPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  })
  
  if (!dbUser || dbUser.role !== 'ADMIN') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen">
      <CreatePostForm />
    </div>
  )
}

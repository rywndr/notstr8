import { createServerSupabaseClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { EditPostForm } from '@/components/activities/EditPostForm'

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  
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

  const post = await prisma.post.findUnique({
    where: { id }
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <EditPostForm post={post} />
    </div>
  )
}

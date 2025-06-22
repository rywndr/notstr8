import { getPosts } from '@/actions/posts'
import { ActivitiesClient } from '@/components/activities/ActivitiesClient'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export default async function ActivitiesPage() {
  const result = await getPosts()
  
  // Check if user is admin
  let isAdmin = false
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const dbUser = await prisma.user.findUnique({
        where: { supabaseId: user.id }
      })
      isAdmin = dbUser?.role === 'ADMIN'
    }
  } catch {
    // User not authenticated, continue as non-admin
  }
  
  if (result.error) {
    return (
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="text-gray-600 mt-2">{result.error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ActivitiesClient posts={result.posts || []} isAdmin={isAdmin} />
      </div>
    </div>
  )
}

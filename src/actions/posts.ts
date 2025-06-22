'use server'

import { prisma } from '@/lib/prisma'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createPost(title: string, content: string, imageUrl?: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  })
  
  if (!dbUser || dbUser.role !== 'ADMIN') {
    return { error: 'Access denied' }
  }

  try {
    const authorName = dbUser.role === 'ADMIN' ? `${dbUser.name || dbUser.email} (admin)` : dbUser.name || dbUser.email

    await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        authorId: dbUser.id,
        authorName
      }
    })

    revalidatePath('/activities')
    return { success: 'Post berhasil dibuat' }
  } catch (error) {
    console.error('Error creating post:', error)
    return { error: 'Gagal membuat post' }
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            role: true
          }
        }
      }
    })

    return { success: true, posts }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return { error: 'Failed to fetch posts' }
  }
}

export async function updatePost(id: string, data: { title: string; content: string; imageUrl?: string | null }) {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  })
  
  if (!dbUser || dbUser.role !== 'ADMIN') {
    return { error: 'Access denied' }
  }

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl || null,
        updatedAt: new Date()
      }
    })

    revalidatePath('/activities')
    return { success: true }
  } catch {
    return { error: 'Failed to update post' }
  }
}

export async function deletePost(id: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  })
  
  if (!dbUser || dbUser.role !== 'ADMIN') {
    return { error: 'Access denied' }
  }

  try {
    await prisma.post.delete({
      where: { id }
    })

    revalidatePath('/activities')
    return { success: true }
  } catch {
    return { error: 'Failed to delete post' }
  }
}

import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user: supabaseUser }, error } = await supabase.auth.getUser()

    if (error || !supabaseUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Find user in database
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: supabaseUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        hasSubmittedForm: true,
      }
    })

    if (!dbUser) {
      // Create user if doesn't exist
      const newUser = await prisma.user.create({
        data: {
          supabaseId: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.name || null,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          hasSubmittedForm: true,
        }
      })
      
      return NextResponse.json(newUser)
    }

    return NextResponse.json(dbUser)
  } catch (error) {
    console.error('Error in /api/user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

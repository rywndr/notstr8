'use server'

import { prisma } from '@/lib/prisma'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function getMemberChangeLogs(memberId: string) {
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
    const changeLogs = await prisma.changeLog.findMany({
      where: { memberId },
      orderBy: { createdAt: 'desc' },
      include: {
        member: {
          select: {
            firstName: true,
            middleName: true,
            lastName: true
          }
        },
        changedBy: {
          select: {
            name: true,
            email: true,
            role: true
          }
        }
      }
    })

    return { success: true, changeLogs }
  } catch (error) {
    console.error('Error fetching change logs:', error)
    return { error: 'Failed to fetch change logs' }
  }
}

export async function logMemberChange(
  memberId: string,
  changedById: string,
  changedByName: string,
  fieldName: string,
  oldValue: string | number | boolean | null,
  newValue: string | number | boolean | null,
  action: string = 'UPDATE'
) {
  try {
    await prisma.changeLog.create({
      data: {
        memberId,
        changedById,
        changedByName,
        fieldName,
        oldValue: oldValue ? String(oldValue) : null,
        newValue: newValue ? String(newValue) : null,
        action
      }
    })
  } catch (error) {
    console.error('Error logging change:', error)
  }
}

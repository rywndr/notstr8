'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteMember(id: string) {
  try {
    await prisma.communityMember.delete({
      where: { id }
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete member' };
  }
}

export async function updateMember(id: string, data: any) {
  try {
    await prisma.communityMember.update({
      where: { id },
      data
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update member' };
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

interface DeleteMemberResult {
  success?: string;
  error?: string;
}

export async function deleteMember(id: string): Promise<DeleteMemberResult> {
  try {
    await prisma.communityMember.delete({
      where: { id },
    });

    revalidatePath('/admin');
    return { success: 'Data berhasil dihapus.' };
  } catch (deleteError) {
    console.error('Error deleting community member:', deleteError);
    return { error: 'Gagal menghapus data.' };
  }
}

export async function getMember(id: string) {
  try {
    const member = await prisma.communityMember.findUnique({
      where: { id },
    });
    return member;
  } catch (fetchError) {
    console.error('Error fetching community member:', fetchError);
    return null;
  }
}

'use server';

import prisma from '@/lib/prisma';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Prisma, EducationLevel, EmploymentStatus, SocialSecurityType } from '../../prisma/app/generated/prisma';

export async function exportMembersToExcel(
  searchQuery?: string,
  socialSecurityTypeFilter?: string,
  socialAssistanceStatus?: string,
  educationLevel?: string,
  employmentStatus?: string
) {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  });
  
  if (!dbUser || dbUser.role !== 'ADMIN') {
    return { error: 'Access denied' };
  }

  try {
    const whereClause: Prisma.CommunityMemberWhereInput = {};

    if (searchQuery) {
      whereClause.OR = [
        { firstName: { contains: searchQuery, mode: 'insensitive' } },
        { middleName: { contains: searchQuery, mode: 'insensitive' } },
        { lastName: { contains: searchQuery, mode: 'insensitive' } },
        { nik: { contains: searchQuery, mode: 'insensitive' } },
        { familyCardNumber: { contains: searchQuery, mode: 'insensitive' } },
        { communityNickname: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    if (socialSecurityTypeFilter && socialSecurityTypeFilter !== 'all') {
      whereClause.socialSecurityType = socialSecurityTypeFilter as SocialSecurityType;
    }

    if (socialAssistanceStatus === 'true') whereClause.receivesSocialAssistance = true;
    else if (socialAssistanceStatus === 'false') whereClause.receivesSocialAssistance = false;

    if (educationLevel && educationLevel !== 'all') {
      whereClause.lastEducation = educationLevel as EducationLevel;
    }

    if (employmentStatus && employmentStatus !== 'all') {
      whereClause.employmentStatus = employmentStatus as EmploymentStatus;
    }

    const members = await prisma.communityMember.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, members };
  } catch (error) {
    console.error('Error exporting members:', error);
    return { error: 'Export failed' };
  }
}

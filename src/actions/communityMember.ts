'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { 
  CommunityMember, 
  Gender, 
  GenderIdentity, 
  ResidencyStatus, 
  LivingSituation, 
  EKTPStatus, 
  EducationLevel, 
  HealthServiceAccess, 
  DiscriminationExperience,
  MaritalStatus,
  EmploymentStatus,
  SocialSecurityType,
  DisabilityType,
  DiscriminationType,
  DiscriminationPerpetrator
} from '../../prisma/app/generated/prisma';
import { Prisma } from '../../prisma/app/generated/prisma';
import { createPendingSubmission, type SubmissionFormData } from './pendingSubmissions';
import { logMemberChange } from './change-logs';

// Type for form data (excluding id, createdAt, updatedAt which are auto-generated/managed)
export type CommunityMemberFormData = Omit<CommunityMember, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Server action to submit a form for admin approval
 * @param formData Form data containing community member details
 * @returns Object with success message or error
 */
export async function addCommunityMember(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { error: 'Anda harus login terlebih dahulu.' }
  }

  try {
    // Check if user exists and hasn't submitted form
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id }
    })

    if (!dbUser) {
      return { error: 'User tidak ditemukan.' }
    }

    if (dbUser.hasSubmittedForm) {
      return { error: 'Anda sudah pernah mengisi formulir.' }
    }

    // Check if user has pending submission and prevent resubmission
    if (dbUser.submissionStatus === 'PENDING_REVIEW') {
      return { error: 'Formulir Anda sedang dalam proses review. Silakan tunggu hasil review.' }
    }

    const data: SubmissionFormData = {
      firstName: formData.get('firstName') as string,
      middleName: formData.get('middleName') as string || undefined,
      lastName: formData.get('lastName') as string || undefined,
      communityNickname: formData.get('communityNickname') as string || undefined,
      placeOfBirth: formData.get('placeOfBirth') as string || undefined,
      dateOfBirth: formData.get('dateOfBirth') ? new Date(formData.get('dateOfBirth') as string) : undefined,
      age: formData.get('age') ? parseInt(formData.get('age') as string, 10) : undefined,
      gender: formData.get('gender') as Gender || undefined,
      genderIdentity: formData.get('genderIdentity') as GenderIdentity || undefined,
      nik: formData.get('nik') as string || undefined,
      familyCardNumber: formData.get('familyCardNumber') as string || undefined,
      ektpStatus: formData.get('ektpStatus') as EKTPStatus || undefined,
      address: formData.get('address') as string || undefined,
      domicileKelurahan: formData.get('domicileKelurahan') as string || undefined,
      domicileKecamatan: formData.get('domicileKecamatan') as string || undefined,
      domicileRegencyCity: formData.get('domicileRegencyCity') as string || undefined,
      city: formData.get('city') as string,
      residencyStatus: formData.get('residencyStatus') as ResidencyStatus || undefined,
      livingSituation: formData.get('livingSituation') as LivingSituation || undefined,
      phoneNumber: formData.get('phoneNumber') ? `+62${formData.get('phoneNumber')}` as string : undefined,
      maritalStatus: formData.get('maritalStatus') as MaritalStatus || undefined,
      lastEducation: formData.get('lastEducation') as EducationLevel || undefined,
      isStillStudying: formData.get('isStillStudying') === 'on',
      employmentStatus: formData.get('employmentStatus') as EmploymentStatus || undefined,
      jobDescription: formData.get('employmentStatus') === 'BEKERJA' ? (formData.get('jobDescription') as string || undefined) : undefined,
      monthlyIncome: formData.get('monthlyIncome') ? (formData.get('monthlyIncome') as string).replace(/\D/g, '') : undefined,
      hasOwnBusiness: formData.get('hasOwnBusiness') === 'on',
      businessDetails: formData.get('hasOwnBusiness') === 'on' ? (formData.get('businessDetails') as string || undefined) : undefined,
      
      hasReceivedSkillTraining: formData.get('hasReceivedSkillTraining') === 'on',
      skillTrainingTypes: formData.getAll('skillTrainingTypes').map(s => String(s)).filter(s => s.trim() !== '') || [],
      trainingOrganizers: formData.getAll('trainingOrganizers').map(s => String(s)).filter(s => s.trim() !== '') || [],
      desiredSkillTrainings: formData.getAll('desiredSkillTrainings').map(s => String(s)).filter(s => s.trim() !== '') || [],
      
      socialSecurityType: formData.get('socialSecurityType') as SocialSecurityType || SocialSecurityType.NONE,
      socialSecurityOther: formData.get('socialSecurityType') === SocialSecurityType.OTHER ? (formData.get('socialSecurityOther') as string || undefined) : undefined,
      socialSecurityId: formData.get('socialSecurityId') as string || undefined,

      healthServiceAccess: formData.get('healthServiceAccess') as HealthServiceAccess || undefined,
      chronicIllness: formData.get('chronicIllness') as string || undefined,

      isPersonWithDisability: formData.get('isPersonWithDisability') === 'on',
      disabilityTypes: formData.getAll('disabilityTypes') as DisabilityType[] || [],
      disabilityNotes: formData.get('isPersonWithDisability') === 'on' ? (formData.get('disabilityNotes') as string || undefined) : undefined,
      
      discriminationExperience: formData.get('discriminationExperience') as DiscriminationExperience || undefined,
      discriminationTypes: formData.getAll('discriminationTypes') as DiscriminationType[] || [],
      discriminationPerpetrators: formData.getAll('discriminationPerpetrators') as DiscriminationPerpetrator[] || [],
      discriminationPerpetratorOther: (formData.getAll('discriminationPerpetrators') as DiscriminationPerpetrator[]).includes(DiscriminationPerpetrator.OTHER) ? (formData.get('discriminationPerpetratorOther') as string || undefined) : undefined,
      discriminationLocation: formData.get('discriminationExperience') === 'PERNAH_MENGALAMI' ? (formData.get('discriminationLocation') as string || undefined) : undefined,
      wasDiscriminationReported: formData.get('discriminationExperience') === 'PERNAH_MENGALAMI' && formData.get('wasDiscriminationReported') === 'on',
      
      receivesSocialAssistance: formData.get('receivesSocialAssistance') === 'on',
      otherSocialAssistance: formData.getAll('otherSocialAssistance').map(s => String(s)).filter(s => s.trim() !== '') || [],
      isRegisteredInDTKS: formData.get('isRegisteredInDTKS') === 'on',
      communityGroup: formData.get('communityGroup') as string || undefined,
    };

    // Handle file uploads
    const idScanFile = formData.get('idScanUrl') as File;
    if (formData.get('ektpStatus') === 'MEMILIKI' && idScanFile && idScanFile.size > 0) {
      data.idScanUrl = `/uploads/id_scans/${Date.now()}_${idScanFile.name}`; 
      // TODO: Handle file upload to server
    }

    const socialSecurityScanFile = formData.get('socialSecurityScanUrl') as File;
    if (data.socialSecurityType && data.socialSecurityType !== SocialSecurityType.NONE && socialSecurityScanFile && socialSecurityScanFile.size > 0) {
      data.socialSecurityScanUrl = `/uploads/social_security_scans/${Date.now()}_${socialSecurityScanFile.name}`;
      // TODO: Handle file upload to server
    }

    if (!data.firstName || !data.city) {
      return { error: 'Nama Depan dan Kota wajib diisi.' };
    }
    
    if (data.phoneNumber && !data.phoneNumber.startsWith('+628')) {
      return { error: 'Format nomor telepon tidak valid. Harus diawali dengan 8 setelah kode negara +62.' };
    }

    // Create pending submission instead of directly creating member
    const result = await createPendingSubmission(data, user.email!, dbUser.id)
    
    if (result.success) {
      revalidatePath('/'); 
      revalidatePath('/form');
      return { success: 'Formulir berhasil dikirim untuk ditinjau admin. Anda akan mendapat notifikasi setelah ditinjau.' };
    } else {
      return { error: result.error || 'Gagal mengirim formulir untuk ditinjau.' };
    }
  } catch (error) {
    console.error('Error submitting form for review:', error);
    return { error: 'Gagal mengirim formulir. Periksa konsol untuk detail.' };
  }
}

/**
 * Server action to get community members with pagination and filtering
 * @param page The current page number (1-indexed)
 * @param pageSize The number of items per page
 * @param searchQuery Optional search query for names, NIK, or KK
 * @param bpjsStatus Optional filter for BPJS status ('true', 'false', or 'all')
 * @param socialAssistanceStatus Optional filter for social assistance status ('true', 'false', or 'all')
 * @param educationLevel Optional filter for education level
 * @param employmentStatus Optional filter for employment status
 * @returns Object with members for the current page and total count
 */
export async function getCommunityMembers(
  page: number = 1,
  pageSize: number = 10,
  searchQuery?: string,
  socialSecurityType?: string,
  socialAssistanceStatus?: string,
  educationLevel?: string,
  employmentStatus?: string
): Promise<{ members: CommunityMember[]; totalCount: number; overallTotalCount: number }> {
  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

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

    if (socialSecurityType && socialSecurityType !== 'all') {
      whereClause.socialSecurityType = socialSecurityType as SocialSecurityType;
    }


    if (socialAssistanceStatus && socialAssistanceStatus !== 'all') {
      if (socialAssistanceStatus === 'government') {
        whereClause.receivesSocialAssistance = true;
      } else if (socialAssistanceStatus === 'other') {
        whereClause.otherSocialAssistance = {
          isEmpty: false
        };
      } else if (socialAssistanceStatus === 'any') {
        whereClause.OR = [
          { receivesSocialAssistance: true },
          { otherSocialAssistance: { isEmpty: false } }
        ];
      } else if (socialAssistanceStatus === 'none') {
        whereClause.receivesSocialAssistance = false;
        whereClause.otherSocialAssistance = { isEmpty: true };
      } else if (socialAssistanceStatus === 'true') {
        // backwards compatibility
        whereClause.receivesSocialAssistance = true;
      } else if (socialAssistanceStatus === 'false') {
        // backwards compatibility
        whereClause.receivesSocialAssistance = false;
      }
    }

    if (educationLevel && educationLevel !== 'all') {
      whereClause.lastEducation = educationLevel as EducationLevel;
    }

    if (employmentStatus && employmentStatus !== 'all') {
      whereClause.employmentStatus = employmentStatus as EmploymentStatus;
    }

    const [members, filteredTotalCount, overallTotalCount] = await prisma.$transaction([
      prisma.communityMember.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
      prisma.communityMember.count({ where: whereClause }),
      prisma.communityMember.count(),
    ]);

    return { members, totalCount: filteredTotalCount, overallTotalCount };
  } catch (error) {
    console.error('Error fetching community members:', error);
    return { members: [], totalCount: 0, overallTotalCount: 0 };
  }
}

/**
 * Server action to update a community member
 * @param id Member ID to update
 * @param data Updated member data
 * @returns Object with success message or error
 */
export async function updateMember(id: string, data: Record<string, unknown>) {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { error: 'Anda harus login terlebih dahulu.' }
  }

  // Check if user is admin or editing their own data
  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: { communityMember: true }
  })

  if (!dbUser) {
    return { error: 'User tidak ditemukan.' }
  }

  // Allow if user is admin OR if user is editing their own submission
  const isAdmin = dbUser.role === 'ADMIN'
  const isOwnData = dbUser.communityMember?.id === id
  
  if (!isAdmin && !isOwnData) {
    return { error: 'Anda tidak memiliki akses untuk mengubah data ini.' }
  }

  try {
    // Get the current member data before updating
    const currentMember = await prisma.communityMember.findUnique({
      where: { id }
    });

    if (!currentMember) {
      return { error: 'Member tidak ditemukan.' };
    }

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => {
        if (Array.isArray(value)) return true;
        if (value === undefined || value === null) return false;
        if (typeof value === 'boolean') return true;
        if (typeof value === 'number') return true;
        if (typeof value === 'string') return true;
        return true;
      })
    );

    // Process phone number format
    if (cleanData.phoneNumber && !String(cleanData.phoneNumber).startsWith('+62')) {
      cleanData.phoneNumber = `+62${cleanData.phoneNumber}`;
    }

    // Convert string numbers to actual numbers where needed
    if (cleanData.age && typeof cleanData.age === 'string') {
      cleanData.age = parseInt(cleanData.age, 10);
    }

    // Convert date strings to Date objects
    if (cleanData.dateOfBirth && typeof cleanData.dateOfBirth === 'string') {
      cleanData.dateOfBirth = new Date(cleanData.dateOfBirth);
    }

    if (cleanData.disabilityTypes && !Array.isArray(cleanData.disabilityTypes)) {
      cleanData.disabilityTypes = [cleanData.disabilityTypes].filter(Boolean) as DisabilityType[];
    } else if (Array.isArray(cleanData.disabilityTypes)) {
      cleanData.disabilityTypes = (cleanData.disabilityTypes as string[]).filter(Boolean) as DisabilityType[];
    }

    if (cleanData.discriminationTypes && !Array.isArray(cleanData.discriminationTypes)) {
      cleanData.discriminationTypes = [cleanData.discriminationTypes].filter(Boolean) as DiscriminationType[];
    } else if (Array.isArray(cleanData.discriminationTypes)) {
      cleanData.discriminationTypes = (cleanData.discriminationTypes as string[]).filter(Boolean) as DiscriminationType[];
    }
    
    if (cleanData.discriminationPerpetrators && !Array.isArray(cleanData.discriminationPerpetrators)) {
      cleanData.discriminationPerpetrators = [cleanData.discriminationPerpetrators].filter(Boolean) as DiscriminationPerpetrator[];
    } else if (Array.isArray(cleanData.discriminationPerpetrators)) {
      cleanData.discriminationPerpetrators = (cleanData.discriminationPerpetrators as string[]).filter(Boolean) as DiscriminationPerpetrator[];
    }

    if (cleanData.otherSocialAssistance && !Array.isArray(cleanData.otherSocialAssistance)) {
        cleanData.otherSocialAssistance = [cleanData.otherSocialAssistance].filter(s => String(s).trim() !== '');
    } else if (Array.isArray(cleanData.otherSocialAssistance)) {
        cleanData.otherSocialAssistance = (cleanData.otherSocialAssistance as string[]).map(s => String(s)).filter(s => s.trim() !== '');
    }

    if (cleanData.skillTrainingTypes && !Array.isArray(cleanData.skillTrainingTypes)) {
        cleanData.skillTrainingTypes = [cleanData.skillTrainingTypes].filter(s => String(s).trim() !== '');
    } else if (Array.isArray(cleanData.skillTrainingTypes)) {
        cleanData.skillTrainingTypes = (cleanData.skillTrainingTypes as string[]).map(s => String(s)).filter(s => s.trim() !== '');
    }

    if (cleanData.trainingOrganizers && !Array.isArray(cleanData.trainingOrganizers)) {
        cleanData.trainingOrganizers = [cleanData.trainingOrganizers].filter(s => String(s).trim() !== '');
    } else if (Array.isArray(cleanData.trainingOrganizers)) {
        cleanData.trainingOrganizers = (cleanData.trainingOrganizers as string[]).map(s => String(s)).filter(s => s.trim() !== '');
    }

    if (cleanData.desiredSkillTrainings && !Array.isArray(cleanData.desiredSkillTrainings)) {
        cleanData.desiredSkillTrainings = [cleanData.desiredSkillTrainings].filter(s => String(s).trim() !== '');
    } else if (Array.isArray(cleanData.desiredSkillTrainings)) {
        cleanData.desiredSkillTrainings = (cleanData.desiredSkillTrainings as string[]).map(s => String(s)).filter(s => s.trim() !== '');
    }


    await prisma.communityMember.update({
      where: { id },
      data: cleanData as Partial<CommunityMemberFormData>,
    });

    // Log changes for each field that was updated
    for (const [fieldName, newValue] of Object.entries(cleanData)) {
      const oldValue = currentMember[fieldName as keyof CommunityMember];
      
      // Only log if the value actually changed
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        await logMemberChange(
          id,
          dbUser.id,
          dbUser.role === 'ADMIN' ? `${dbUser.name || dbUser.email} (admin)` : dbUser.name || dbUser.email,
          fieldName,
          oldValue as string | number | boolean | null,
          newValue as string | number | boolean | null,
          'UPDATE'
        );
      }
    }

    revalidatePath('/admin');
    revalidatePath('/form/edit');
    return { success: 'Data berhasil diperbarui.' };
  } catch (error) {
    console.error('Error updating community member:', error);
    return { error: 'Gagal memperbarui data.' };
  }
}

/**
 * Server action to get dashboard statistics
 * @returns Object with total members and distribution data
 */
export async function getDashboardStats(): Promise<{
  totalMembers: number;
  ageDistribution: { age: number; count: number }[];
  educationDistribution: { education: string; count: number }[];
  employmentDistribution: { employment: string; count: number }[];
  genderDistribution: { gender: string; count: number }[];
}> {
  try {
    const members = await prisma.communityMember.findMany({
      select: {
        age: true,
        lastEducation: true,
        employmentStatus: true,
        gender: true,
      }
    });

    const totalMembers = members.length;

    // Age distribution
    const ageCounts: { [age: number]: number } = {};
    members.forEach(member => {
      if (member.age) {
        ageCounts[member.age] = (ageCounts[member.age] || 0) + 1;
      }
    });
    const ageDistribution = Object.entries(ageCounts)
      .map(([age, count]) => ({ age: parseInt(age), count }))
      .sort((a, b) => a.age - b.age);

    // Education distribution
    const educationCounts: { [education: string]: number } = {};
    members.forEach(member => {
      if (member.lastEducation) {
        educationCounts[member.lastEducation] = (educationCounts[member.lastEducation] || 0) + 1;
      }
    });
    const educationDistribution = Object.entries(educationCounts)
      .map(([education, count]) => ({ education, count }));

    // Employment distribution
    const employmentCounts: { [employment: string]: number } = {};
    members.forEach(member => {
      if (member.employmentStatus) {
        employmentCounts[member.employmentStatus] = (employmentCounts[member.employmentStatus] || 0) + 1;
      }
    });
    const employmentDistribution = Object.entries(employmentCounts)
      .map(([employment, count]) => ({ employment, count }));

    // Gender distribution
    const genderCounts: { [gender: string]: number } = {};
    members.forEach(member => {
      if (member.gender) {
        genderCounts[member.gender] = (genderCounts[member.gender] || 0) + 1;
      }
    });
    const genderDistribution = Object.entries(genderCounts)
      .map(([gender, count]) => ({ gender, count }));

    return {
      totalMembers,
      ageDistribution,
      educationDistribution,
      employmentDistribution,
      genderDistribution
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalMembers: 0,
      ageDistribution: [],
      educationDistribution: [],
      employmentDistribution: [],
      genderDistribution: []
    };
  }
}

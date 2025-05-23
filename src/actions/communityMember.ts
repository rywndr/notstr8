'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
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
  EmploymentStatus
} from '../../prisma/app/generated/prisma';

// Type for form data (excluding id, createdAt, updatedAt which are auto-generated/managed)
export type CommunityMemberFormData = Omit<CommunityMember, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Server action to add a new community member
 * @param formData Form data containing community member details
 * @returns Object with success message or error
 */
export async function addCommunityMember(formData: FormData) {
  try {
    const data: Partial<CommunityMemberFormData> = {
      firstName: formData.get('firstName') as string,
      middleName: formData.get('middleName') as string || null,
      lastName: formData.get('lastName') as string || null,
      communityNickname: formData.get('communityNickname') as string || null,
      placeOfBirth: formData.get('placeOfBirth') as string || null,
      dateOfBirth: formData.get('dateOfBirth') ? new Date(formData.get('dateOfBirth') as string) : null,
      age: formData.get('age') ? parseInt(formData.get('age') as string, 10) : null,
      gender: formData.get('gender') as Gender || null,
      genderIdentity: formData.get('genderIdentity') as GenderIdentity || null,
      nik: formData.get('nik') as string || null,
      familyCardNumber: formData.get('familyCardNumber') as string || null,
      ektpStatus: formData.get('ektpStatus') as EKTPStatus || null,
      address: formData.get('address') as string || null,
      domicileKelurahan: formData.get('domicileKelurahan') as string || null,
      domicileKecamatan: formData.get('domicileKecamatan') as string || null,
      domicileRegencyCity: formData.get('domicileRegencyCity') as string || null,
      city: formData.get('city') as string,
      residencyStatus: formData.get('residencyStatus') as ResidencyStatus || null,
      livingSituation: formData.get('livingSituation') as LivingSituation || null,
      phoneNumber: formData.get('phoneNumber') ? `+62${formData.get('phoneNumber')}` as string : null,
      maritalStatus: formData.get('maritalStatus') as MaritalStatus || null,
      lastEducation: formData.get('lastEducation') as EducationLevel || null,
      isStillStudying: formData.get('isStillStudying') === 'on',
      employmentStatus: formData.get('employmentStatus') as EmploymentStatus || null,
      jobDescription: formData.get('employmentStatus') === 'BEKERJA' ? (formData.get('jobDescription') as string || null) : null,
      monthlyIncome: formData.get('monthlyIncome') ? (formData.get('monthlyIncome') as string).replace(/\D/g, '') : null,
      hasOwnBusiness: formData.get('hasOwnBusiness') === 'on',
      businessDetails: formData.get('hasOwnBusiness') === 'on' ? (formData.get('businessDetails') as string || null) : null,
      hasReceivedSkillTraining: formData.get('hasReceivedSkillTraining') === 'on',
      skillTrainingType: formData.get('hasReceivedSkillTraining') === 'on' ? (formData.get('skillTrainingType') as string || null) : null,
      desiredSkillTraining: formData.get('desiredSkillTraining') as string || null,
      hasBpjs: formData.get('hasBpjs') === 'on',
      bpjsId: formData.get('hasBpjs') === 'on' ? (formData.get('bpjsId') as string || null) : null,
      healthServiceAccess: formData.get('healthServiceAccess') as HealthServiceAccess || null,
      chronicIllness: formData.get('chronicIllness') as string || null,
      discriminationExperience: formData.get('discriminationExperience') as DiscriminationExperience || null,
      discriminationType: formData.get('discriminationExperience') === 'PERNAH_MENGALAMI' ? (formData.get('discriminationType') as string || null) : null,
      discriminationPerpetrator: formData.get('discriminationExperience') === 'PERNAH_MENGALAMI' ? (formData.get('discriminationPerpetrator') as string || null) : null,
      discriminationLocation: formData.get('discriminationExperience') === 'PERNAH_MENGALAMI' ? (formData.get('discriminationLocation') as string || null) : null,
      wasDiscriminationReported: formData.get('discriminationExperience') === 'PERNAH_MENGALAMI' && formData.get('wasDiscriminationReported') === 'on',
      receivesSocialAssistance: formData.get('receivesSocialAssistance') === 'on',
      isRegisteredInDTKS: formData.get('isRegisteredInDTKS') === 'on',
      communityGroup: formData.get('communityGroup') as string || null,
    };

    const idScanFile = formData.get('idScanUrl') as File;
    if (formData.get('ektpStatus') === 'MEMILIKI' && idScanFile && idScanFile.size > 0) {
      data.idScanUrl = `/uploads/id_scans/${Date.now()}_${idScanFile.name}`; 
      // TODO: Handle file upload to server
    }

    const bpjsScanFile = formData.get('bpjsScanUrl') as File;
    if (formData.get('hasBpjs') === 'on' && bpjsScanFile && bpjsScanFile.size > 0) {
      data.bpjsScanUrl = `/uploads/bpjs_scans/${Date.now()}_${bpjsScanFile.name}`; 
      // TODO: Handle file upload to server
    }

    if (!data.firstName || !data.city) {
      return { error: 'Nama Depan dan Kota wajib diisi.' };
    }
    
    if (data.phoneNumber && !data.phoneNumber.startsWith('+628')) {
      return { error: 'Format nomor telepon tidak valid. Harus diawali dengan 8 setelah kode negara +62.' };
    }

    await prisma.communityMember.create({
      data: data as CommunityMemberFormData,
    });

    revalidatePath('/'); 
    revalidatePath('/admin');
    return { success: 'Data berhasil ditambahkan.' };
  } catch (error) {
    console.error('Error adding community member:', error);
    return { error: 'Gagal menambahkan data. Periksa konsol untuk detail.' };
  }
}

/**
 * Server action to get community members with pagination and filtering
 * @param page The current page number (1-indexed)
 * @param pageSize The number of items per page
 * @param searchQuery Optional search query for names, NIK, or KK
 * @param bpjsStatus Optional filter for BPJS status ('true', 'false', or 'all')
 * @param socialAssistanceStatus Optional filter for social assistance status ('true', 'false', or 'all')
 * @returns Object with members for the current page and total count
 */
export async function getCommunityMembers(
  page: number = 1,
  pageSize: number = 10,
  searchQuery?: string,
  bpjsStatus?: string,
  socialAssistanceStatus?: string
): Promise<{ members: CommunityMember[]; totalCount: number; overallTotalCount: number }> {
  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const whereClause: any = {};

    if (searchQuery) {
      whereClause.OR = [
        { firstName: { contains: searchQuery, mode: 'insensitive' } },
        { middleName: { contains: searchQuery, mode: 'insensitive' } },
        { lastName: { contains: searchQuery, mode: 'insensitive' } },
        { nik: { contains: searchQuery, mode: 'insensitive' } },
        { familyCardNumber: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    if (bpjsStatus === 'true') {
      whereClause.hasBpjs = true;
    } else if (bpjsStatus === 'false') {
      whereClause.hasBpjs = false;
    }

    if (socialAssistanceStatus === 'true') {
      whereClause.receivesSocialAssistance = true;
    } else if (socialAssistanceStatus === 'false') {
      whereClause.receivesSocialAssistance = false;
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
      prisma.communityMember.count(), // New count for overall total
    ]);

    return { members, totalCount: filteredTotalCount, overallTotalCount };
  } catch (error) {
    console.error('Error fetching community members:', error);
    return { members: [], totalCount: 0, overallTotalCount: 0 };
  }
}

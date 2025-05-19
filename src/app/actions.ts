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
      phoneNumber: formData.get('phoneNumber') as string || null,
      serviceContactPerson: formData.get('serviceContactPerson') as string || null,
      maritalStatus: formData.get('maritalStatus') as MaritalStatus || null,
      lastEducation: formData.get('lastEducation') as EducationLevel || null,
      isStillStudying: formData.get('isStillStudying') === 'on',
      employmentStatus: formData.get('employmentStatus') as EmploymentStatus || null,
      jobDescription: formData.get('jobDescription') as string || null,
      monthlyIncome: formData.get('monthlyIncome') as string || null,
      hasOwnBusiness: formData.get('hasOwnBusiness') === 'on',
      hasReceivedSkillTraining: formData.get('hasReceivedSkillTraining') === 'on',
      skillTrainingType: formData.get('skillTrainingType') as string || null,
      desiredSkillTraining: formData.get('desiredSkillTraining') as string || null,
      hasBpjs: formData.get('hasBpjs') === 'on',
      bpjsId: formData.get('bpjsId') as string || null,
      healthServiceAccess: formData.get('healthServiceAccess') as HealthServiceAccess || null,
      chronicIllness: formData.get('chronicIllness') as string || null,
      discriminationExperience: formData.get('discriminationExperience') as DiscriminationExperience || null,
      discriminationType: formData.get('discriminationType') as string || null,
      discriminationPerpetrator: formData.get('discriminationPerpetrator') as string || null,
      discriminationLocation: formData.get('discriminationLocation') as string || null,
      wasDiscriminationReported: formData.get('wasDiscriminationReported') === 'on',
      receivesSocialAssistance: formData.get('receivesSocialAssistance') === 'on',
      isRegisteredInDTKS: formData.get('isRegisteredInDTKS') === 'on',
      communityGroup: formData.get('communityGroup') as string || null,
    };

    // --- Placeholder for File Handling ---
    // In a real app, uploaded files needs to go to dedicated storage (e.g., S3, Cloudinary)
    // and get back URLs to store in the database.
    // For now, I'll just use placeholders if files are provided.

    const idScanFile = formData.get('idScanUrl') as File;
    if (idScanFile && idScanFile.size > 0) {
      data.idScanUrl = `/uploads/id_scans/${Date.now()}_${idScanFile.name}`; // Placeholder URL
      // TODO: Implement actual file upload logic for idScanFile
    }

    const bpjsScanFile = formData.get('bpjsScanUrl') as File;
    if (bpjsScanFile && bpjsScanFile.size > 0) {
      data.bpjsScanUrl = `/uploads/bpjs_scans/${Date.now()}_${bpjsScanFile.name}`; // Placeholder URL
      // TODO: Implement actual file upload logic for bpjsScanFile
    }

    if (!data.firstName || !data.city) {
      return { error: 'Nama Depan dan Kota wajib diisi.' };
    }

    await prisma.communityMember.create({
      data: data as CommunityMemberFormData,
    });

    revalidatePath('/'); // Revalidate the page to show the new entry
    return { success: 'Data berhasil ditambahkan.' };
  } catch (error) {
    console.error('Error adding community member:', error);
    return { error: 'Gagal menambahkan data. Periksa konsol untuk detail.' };
  }
}

export async function getCommunityMembers(): Promise<CommunityMember[]> {
  try {
    return await prisma.communityMember.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching community members:', error);
    return [];
  }
}
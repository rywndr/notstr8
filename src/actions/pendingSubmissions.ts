'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { 
  SubmissionStatus, 
  DiscriminationExperience,
  EKTPStatus,
  Gender,
  GenderIdentity,
  HealthServiceAccess,
  EducationLevel,
  LivingSituation,
  ResidencyStatus,
  EmploymentStatus,
  MaritalStatus,
  DisabilityType,
  DiscriminationPerpetrator,
  DiscriminationType,
  SocialSecurityType
} from '../../prisma/app/generated/prisma'

export interface SubmissionFormData {
  firstName: string
  middleName?: string
  lastName?: string
  nik?: string
  idScanUrl?: string
  dateOfBirth?: Date
  address?: string
  city?: string
  phoneNumber?: string
  age?: number
  chronicIllness?: string
  communityGroup?: string
  communityNickname?: string
  discriminationExperience?: DiscriminationExperience
  discriminationLocation?: string
  domicileKecamatan?: string
  domicileKelurahan?: string
  domicileRegencyCity?: string
  ektpStatus?: EKTPStatus
  familyCardNumber?: string
  gender?: Gender
  genderIdentity?: GenderIdentity
  hasOwnBusiness?: boolean
  hasReceivedSkillTraining?: boolean
  healthServiceAccess?: HealthServiceAccess
  isRegisteredInDTKS?: boolean
  isStillStudying?: boolean
  lastEducation?: EducationLevel
  livingSituation?: LivingSituation
  monthlyIncome?: string
  placeOfBirth?: string
  receivesSocialAssistance?: boolean
  residencyStatus?: ResidencyStatus
  wasDiscriminationReported?: boolean
  jobDescription?: string
  employmentStatus?: EmploymentStatus
  maritalStatus?: MaritalStatus
  businessDetails?: string
  disabilityNotes?: string
  disabilityTypes?: DisabilityType[]
  discriminationPerpetratorOther?: string
  discriminationPerpetrators?: DiscriminationPerpetrator[]
  discriminationTypes?: DiscriminationType[]
  isPersonWithDisability?: boolean
  otherSocialAssistance?: string[]
  socialSecurityId?: string
  socialSecurityOther?: string
  socialSecurityScanUrl?: string
  socialSecurityType?: SocialSecurityType
  desiredSkillTrainings?: string[]
  skillTrainingTypes?: string[]
  trainingOrganizers?: string[]
}

export async function createPendingSubmission(
  formData: SubmissionFormData,
  submitterEmail: string,
  submitterUserId?: string
) {
  try {
    // If user is resubmitting after rejection, remove old rejected submission
    if (submitterUserId) {
      await prisma.pendingSubmission.deleteMany({
        where: { 
          submitterUserId,
          status: SubmissionStatus.REJECTED
        }
      })
    }

    const pendingSubmission = await prisma.pendingSubmission.create({
      data: {
        submitterEmail,
        submitterUserId,
        ...formData,
        status: SubmissionStatus.PENDING
      }
    })

    // Update user's submission status to PENDING_REVIEW
    if (submitterUserId) {
      await prisma.user.update({
        where: { id: submitterUserId },
        data: { submissionStatus: 'PENDING_REVIEW' }
      })
    }

    revalidatePath('/admin')
    return { success: true, id: pendingSubmission.id }
  } catch (error) {
    console.error('Error creating pending submission:', error)
    return { success: false, error: 'Failed to submit form for review' }
  }
}

export async function getPendingSubmissions() {
  try {
    const submissions = await prisma.pendingSubmission.findMany({
      where: {
        status: SubmissionStatus.PENDING
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, submissions }
  } catch (error) {
    console.error('Error fetching pending submissions:', error)
    return { success: false, error: 'Failed to fetch pending submissions' }
  }
}

export async function getAllSubmissions() {
  try {
    const submissions = await prisma.pendingSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, submissions }
  } catch (error) {
    console.error('Error fetching all submissions:', error)
    return { success: false, error: 'Failed to fetch submissions' }
  }
}

export async function approveSubmission(submissionId: string, reviewerId: string) {
  try {
    // Get pending submission
    const submission = await prisma.pendingSubmission.findUnique({
      where: { id: submissionId }
    })

    if (!submission) {
      return { success: false, error: 'Submission not found' }
    }

    if (submission.status !== SubmissionStatus.PENDING) {
      return { success: false, error: 'Submission has already been reviewed' }
    }

    // Start a transaction to approve submission and create member
    const result = await prisma.$transaction(async (tx) => {
      // Update submission status
      await tx.pendingSubmission.update({
        where: { id: submissionId },
        data: {
          status: SubmissionStatus.APPROVED,
          reviewedAt: new Date(),
          reviewedBy: reviewerId
        }
      })

      // Create community member from submission data
      const memberData = {
        firstName: submission.firstName,
        middleName: submission.middleName,
        lastName: submission.lastName,
        nik: submission.nik,
        idScanUrl: submission.idScanUrl,
        dateOfBirth: submission.dateOfBirth,
        address: submission.address,
        city: submission.city,
        phoneNumber: submission.phoneNumber,
        age: submission.age,
        chronicIllness: submission.chronicIllness,
        communityGroup: submission.communityGroup,
        communityNickname: submission.communityNickname,
        discriminationExperience: submission.discriminationExperience,
        discriminationLocation: submission.discriminationLocation,
        domicileKecamatan: submission.domicileKecamatan,
        domicileKelurahan: submission.domicileKelurahan,
        domicileRegencyCity: submission.domicileRegencyCity,
        ektpStatus: submission.ektpStatus,
        familyCardNumber: submission.familyCardNumber,
        gender: submission.gender,
        genderIdentity: submission.genderIdentity,
        hasOwnBusiness: submission.hasOwnBusiness,
        hasReceivedSkillTraining: submission.hasReceivedSkillTraining,
        healthServiceAccess: submission.healthServiceAccess,
        isRegisteredInDTKS: submission.isRegisteredInDTKS,
        isStillStudying: submission.isStillStudying,
        lastEducation: submission.lastEducation,
        livingSituation: submission.livingSituation,
        monthlyIncome: submission.monthlyIncome,
        placeOfBirth: submission.placeOfBirth,
        receivesSocialAssistance: submission.receivesSocialAssistance,
        residencyStatus: submission.residencyStatus,
        wasDiscriminationReported: submission.wasDiscriminationReported,
        jobDescription: submission.jobDescription,
        employmentStatus: submission.employmentStatus,
        maritalStatus: submission.maritalStatus,
        businessDetails: submission.businessDetails,
        userId: submission.submitterUserId,
        disabilityNotes: submission.disabilityNotes,
        disabilityTypes: submission.disabilityTypes,
        discriminationPerpetratorOther: submission.discriminationPerpetratorOther,
        discriminationPerpetrators: submission.discriminationPerpetrators,
        discriminationTypes: submission.discriminationTypes,
        isPersonWithDisability: submission.isPersonWithDisability,
        otherSocialAssistance: submission.otherSocialAssistance,
        socialSecurityId: submission.socialSecurityId,
        socialSecurityOther: submission.socialSecurityOther,
        socialSecurityScanUrl: submission.socialSecurityScanUrl,
        socialSecurityType: submission.socialSecurityType,
        desiredSkillTrainings: submission.desiredSkillTrainings,
        skillTrainingTypes: submission.skillTrainingTypes,
        trainingOrganizers: submission.trainingOrganizers
      }

      const member = await tx.communityMember.create({
        data: memberData
      })

      // Update user's hasSubmittedForm status if user exists
      if (submission.submitterUserId) {
        await tx.user.update({
          where: { id: submission.submitterUserId },
          data: { 
            hasSubmittedForm: true,
            submissionStatus: 'APPROVED'
          }
        })
      }

      return { member }
    })

    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true, member: result.member }
  } catch (error) {
    console.error('Error approving submission:', error)
    return { success: false, error: 'Failed to approve submission' }
  }
}

export async function rejectSubmission(
  submissionId: string, 
  reviewerId: string, 
  rejectionReason: string
) {
  try {
    const submission = await prisma.pendingSubmission.findUnique({
      where: { id: submissionId }
    })

    if (!submission) {
      return { success: false, error: 'Submission not found' }
    }

    if (submission.status !== SubmissionStatus.PENDING) {
      return { success: false, error: 'Submission has already been reviewed' }
    }

    await prisma.pendingSubmission.update({
      where: { id: submissionId },
      data: {
        status: SubmissionStatus.REJECTED,
        reviewedAt: new Date(),
        reviewedBy: reviewerId,
        rejectionReason
      }
    })

    // Update user's submission status if user exists
    if (submission.submitterUserId) {
      await prisma.user.update({
        where: { id: submission.submitterUserId },
        data: { submissionStatus: 'REJECTED' }
      })
    }

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error rejecting submission:', error)
    return { success: false, error: 'Failed to reject submission' }
  }
}

'use client';

import { useState } from 'react';
import { updateMember } from '@/actions/communityMember';
import { 
  CommunityMember, 
  SocialSecurityType, 
  DisabilityType, 
  DiscriminationType, 
  DiscriminationPerpetrator
} from '../../../prisma/app/generated/prisma';
import { calculateAge } from '@/utils/formHandlers';
import { toast } from 'sonner';
import Link from 'next/link';

// Import section components
import { PersonalDataSection } from '../form/sections/PersonalDataSection';
import { ResidencyDataSection } from '../form/sections/ResidencyDataSection';
import { AddressSection } from '../form/sections/AddressSection';
import { ContactSection } from '../form/sections/ContactSection';
import { DisabilitySection } from '../form/sections/DisabilitySection';
import { TrainingSection } from '../form/sections/TrainingSection';
import { SocialEconomicSection } from '../form/sections/SocialEconomicSection';
import { SocialSecuritySection } from '../form/sections/SocialSecuritySection';
import { HealthSection } from '../form/sections/HealthSection';
import { DiscriminationSection } from '../form/sections/DiscriminationSection';
import { SocialAssistanceSection } from '../form/sections/SocialAssistanceSection';

interface EditMemberFormProps {
  member: CommunityMember;
  isUserEdit?: boolean;
}

export function EditMemberForm({ member, isUserEdit = false }: EditMemberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format date for input
  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  // State for section components
  const [dateOfBirth, setDateOfBirth] = useState(formatDateForInput(member.dateOfBirth));
  const [age, setAge] = useState(member.age?.toString() || (member.dateOfBirth ? calculateAge(formatDateForInput(member.dateOfBirth)).toString() : ''));
  const [socialSecurityType, setSocialSecurityType] = useState<SocialSecurityType | "">(member.socialSecurityType || "");
  const [discriminationExperience, setDiscriminationExperience] = useState(member.discriminationExperience || "");
  const [hasReceivedTraining, setHasReceivedTraining] = useState(member.hasReceivedSkillTraining || false);
  const [employmentStatus, setEmploymentStatus] = useState(member.employmentStatus || "");
  const [hasEktp, setHasEktp] = useState(member.ektpStatus === 'MEMILIKI');
  const [hasOwnBusiness, setHasOwnBusiness] = useState(member.hasOwnBusiness || false);
  const [isStillStudying, setIsStillStudying] = useState(member.isStillStudying || false);
  const [educationLevel, setEducationLevel] = useState(member.lastEducation || "");
  const [isPersonWithDisability, setIsPersonWithDisability] = useState(member.isPersonWithDisability || false);
  const [hasDiscrimination] = useState(member.discriminationExperience === 'PERNAH_MENGALAMI');
  
  const [selectedDisabilityTypes, setSelectedDisabilityTypes] = useState<DisabilityType[]>(member.disabilityTypes || []);
  const [selectedDiscriminationTypes, setSelectedDiscriminationTypes] = useState<DiscriminationType[]>(member.discriminationTypes || []);
  const [selectedDiscriminationPerpetrators, setSelectedDiscriminationPerpetrators] = useState<DiscriminationPerpetrator[]>(member.discriminationPerpetrators || []);
  const [otherSocialAssistance, setOtherSocialAssistance] = useState<string[]>(member.otherSocialAssistance?.length ? member.otherSocialAssistance : ['']);
  const [skillTrainingTypes, setSkillTrainingTypes] = useState<string[]>(member.skillTrainingTypes || []);
  const [desiredSkillTrainings, setDesiredSkillTrainings] = useState<string[]>(member.desiredSkillTrainings || []);
  const [trainingOrganizers, setTrainingOrganizers] = useState<string[]>(member.trainingOrganizers || []);

  // Handler functions for SocialAssistanceSection
  const handleOtherSocialAssistanceChange = (index: number, value: string) => {
    setOtherSocialAssistance(prev => {
      const newAssistance = [...prev];
      newAssistance[index] = value;
      return newAssistance;
    });
  };

  const addOtherSocialAssistanceField = () => {
    setOtherSocialAssistance(prev => [...prev, '']);
  };

  const removeOtherSocialAssistanceField = (index: number) => {
    setOtherSocialAssistance(prev => {
      const newAssistance = [...prev];
      newAssistance.splice(index, 1);
      return newAssistance.length > 0 ? newAssistance : [''];
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!e.currentTarget) return;
    const formData = new FormData(e.currentTarget);

    // Add array fields to FormData
    selectedDisabilityTypes.forEach(type => formData.append('disabilityTypes', type));
    selectedDiscriminationTypes.forEach(type => formData.append('discriminationTypes', type));
    selectedDiscriminationPerpetrators.forEach(type => formData.append('discriminationPerpetrators', type));
    otherSocialAssistance.filter(item => item.trim() !== '').forEach(item => formData.append('otherSocialAssistance', item));
    skillTrainingTypes.forEach(type => formData.append('skillTrainingTypes', type));
    desiredSkillTrainings.forEach(training => formData.append('desiredSkillTrainings', training));
    trainingOrganizers.forEach(organizer => formData.append('trainingOrganizers', organizer));

    // Convert FormData to object for updateMember action
    const processedData: Record<string, unknown> = {};
    
    for (const [key, value] of formData.entries()) {
      if (key.endsWith('[]') || ['disabilityTypes', 'discriminationTypes', 'discriminationPerpetrators', 'otherSocialAssistance', 'skillTrainingTypes', 'desiredSkillTrainings', 'trainingOrganizers'].includes(key)) {
        if (!processedData[key]) {
          processedData[key] = [];
        }
        (processedData[key] as string[]).push(value as string);
      } else {
        processedData[key] = value;
      }
    }

    // Handle boolean conversions
    processedData.isStillStudying = Boolean(isStillStudying);
    processedData.hasOwnBusiness = Boolean(hasOwnBusiness);
    processedData.hasReceivedSkillTraining = Boolean(hasReceivedTraining);
    processedData.isPersonWithDisability = Boolean(isPersonWithDisability);
    processedData.wasDiscriminationReported = Boolean(formData.get('wasDiscriminationReported'));
    processedData.receivesSocialAssistance = Boolean(formData.get('receivesSocialAssistance'));
    processedData.isRegisteredInDTKS = Boolean(formData.get('isRegisteredInDTKS'));

    // Handle phone number
    const phoneNumber = formData.get('phoneNumber') as string;
    if (phoneNumber) {
      processedData.phoneNumber = phoneNumber.startsWith('+62') ? phoneNumber : `+62${phoneNumber}`;
    }

    // Handle age and date of birth
    processedData.age = age ? parseInt(age, 10) : null;
    processedData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;

    try {
      const result = await updateMember(member.id, processedData);
      if (result.success) {
        toast.success('Data berhasil diperbarui!', {
          description: 'Perubahan telah disimpan dalam database.',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error('Gagal memperbarui data', {
          description: result.error || 'Terjadi kesalahan saat menyimpan data.',
        });
      }
    } catch (error: unknown) {
      console.error('Error updating member:', error);
      toast.error('Terjadi kesalahan', {
        description: 'Tidak dapat menyimpan perubahan. Silakan coba lagi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonInputStyle = "mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const commonLabelStyle = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          {isUserEdit ? 'Edit Data Anda' : 'Edit Data Member'}
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          {isUserEdit 
            ? 'Perbarui informasi data komunitas Anda di bawah ini'
            : 'Perbarui informasi member di bawah ini'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalDataSection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          age={age}
          setAge={setAge}
          initialData={{
            firstName: member.firstName || '',
            middleName: member.middleName || '',
            lastName: member.lastName || '',
            communityNickname: member.communityNickname || '',
            placeOfBirth: member.placeOfBirth || '',
            gender: member.gender || '',
            genderIdentity: member.genderIdentity || ''
          }}
        />

        <ResidencyDataSection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          hasEktp={hasEktp}
          setHasEktp={setHasEktp}
          initialData={{
            nik: member.nik || '',
            familyCardNumber: member.familyCardNumber || '',
            ektpStatus: member.ektpStatus || '',
            residencyStatus: member.residencyStatus || '',
            livingSituation: member.livingSituation || ''
          }}
        />

        <AddressSection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          initialData={{
            address: member.address || '',
            domicileKelurahan: member.domicileKelurahan || '',
            domicileKecamatan: member.domicileKecamatan || '',
            domicileRegencyCity: member.domicileRegencyCity || '',
            city: member.city || '',
            residencyStatus: member.residencyStatus || '',
            livingSituation: member.livingSituation || ''
          }}
        />

        <ContactSection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          initialData={{
            phoneNumber: member.phoneNumber || ''
          }}
        />

        <DisabilitySection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          isPersonWithDisability={isPersonWithDisability}
          setIsPersonWithDisability={setIsPersonWithDisability}
          selectedDisabilityTypes={selectedDisabilityTypes}
          setSelectedDisabilityTypes={setSelectedDisabilityTypes}
          initialData={{
            disabilityNotes: member.disabilityNotes || ''
          }}
        />

        <TrainingSection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          hasReceivedTraining={hasReceivedTraining}
          setHasReceivedTraining={setHasReceivedTraining}
          skillTrainingTypes={skillTrainingTypes}
          setSkillTrainingTypes={setSkillTrainingTypes}
          trainingOrganizers={trainingOrganizers}
          setTrainingOrganizers={setTrainingOrganizers}
          desiredSkillTrainings={desiredSkillTrainings}
          setDesiredSkillTrainings={setDesiredSkillTrainings}
        />

        <SocialEconomicSection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          employmentStatus={employmentStatus}
          setEmploymentStatus={setEmploymentStatus}
          hasOwnBusiness={hasOwnBusiness}
          setHasOwnBusiness={setHasOwnBusiness}
          isStillStudying={isStillStudying}
          setIsStillStudying={setIsStillStudying}
          educationLevel={educationLevel}
          setEducationLevel={setEducationLevel}
          initialData={{
            maritalStatus: member.maritalStatus || '',
            jobDescription: member.jobDescription || '',
            monthlyIncome: member.monthlyIncome || '',
            businessDetails: member.businessDetails || ''
          }}
        />

        <SocialSecuritySection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          socialSecurityType={socialSecurityType}
          onSocialSecurityTypeChange={setSocialSecurityType}
        />

        <HealthSection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          initialData={{
            healthServiceAccess: member.healthServiceAccess || '',
            chronicIllness: member.chronicIllness || ''
          }}
        />

        <DiscriminationSection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          discriminationExperience={discriminationExperience}
          onDiscriminationExperienceChange={setDiscriminationExperience}
          hasDiscrimination={hasDiscrimination}
          selectedDiscriminationTypes={selectedDiscriminationTypes}
          onDiscriminationTypesChange={setSelectedDiscriminationTypes}
          selectedDiscriminationPerpetrators={selectedDiscriminationPerpetrators}
          onDiscriminationPerpetratorsChange={setSelectedDiscriminationPerpetrators}
          initialData={{
            discriminationLocation: member.discriminationLocation || '',
            wasDiscriminationReported: member.wasDiscriminationReported || false,
            discriminationPerpetratorOther: member.discriminationPerpetratorOther || ''
          }}
        />

        <SocialAssistanceSection
          commonInputStyle={commonInputStyle}
          commonLabelStyle={commonLabelStyle}
          otherSocialAssistance={otherSocialAssistance}
          onOtherSocialAssistanceChange={handleOtherSocialAssistanceChange}
          onAddOtherSocialAssistanceField={addOtherSocialAssistanceField}
          onRemoveOtherSocialAssistanceField={removeOtherSocialAssistanceField}
          initialData={{
            receivesSocialAssistance: member.receivesSocialAssistance || false,
            isRegisteredInDTKS: member.isRegisteredInDTKS || false,
            communityGroup: member.communityGroup || ''
          }}
        />

        <div className="flex justify-end space-x-4">
          <Link
            href="/admin"
            className="px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}


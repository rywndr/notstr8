'use client';

import { useRef, useState, FormEvent } from 'react';
import { addCommunityMember } from '@/actions';
import { toast } from 'sonner';
import { SocialSecurityType, DisabilityType, DiscriminationType, DiscriminationPerpetrator } from '../../../prisma/app/generated/prisma';

import { PersonalDataSection } from './sections/PersonalDataSection';
import { ResidencyDataSection } from './sections/ResidencyDataSection';
import { AddressSection } from './sections/AddressSection';
import { ContactSection } from './sections/ContactSection';
import { DisabilitySection } from './sections/DisabilitySection';
import { TrainingSection } from './sections/TrainingSection';
import { SocialEconomicSection } from './sections/SocialEconomicSection';
import { SocialSecuritySection } from './sections/SocialSecuritySection';
import { HealthSection } from './sections/HealthSection';
import { DiscriminationSection } from './sections/DiscriminationSection';
import { SocialAssistanceSection } from './sections/SocialAssistanceSection';

export default function CommunityForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socialSecurityType, setSocialSecurityType] = useState<SocialSecurityType | "">("");
  const [discriminationExperience, setDiscriminationExperience] = useState("");
  const [hasReceivedTraining, setHasReceivedTraining] = useState(false);
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [hasEktp, setHasEktp] = useState(false);
  const [hasOwnBusiness, setHasOwnBusiness] = useState(false);
  const [isStillStudying, setIsStillStudying] = useState(false);
  const [educationLevel, setEducationLevel] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [isPersonWithDisability, setIsPersonWithDisability] = useState(false);
  const [hasDiscrimination, setHasDiscrimination] = useState(false); // Added state
  const [selectedDisabilityTypes, setSelectedDisabilityTypes] = useState<DisabilityType[]>([]);
  const [selectedDiscriminationTypes, setSelectedDiscriminationTypes] = useState<DiscriminationType[]>([]);
  const [selectedDiscriminationPerpetrators, setSelectedDiscriminationPerpetrators] = useState<DiscriminationPerpetrator[]>([]);
  const [otherSocialAssistance, setOtherSocialAssistance] = useState<string[]>(['']);
  const [skillTrainingTypes, setSkillTrainingTypes] = useState<string[]>([]);
  const [desiredSkillTrainings, setDesiredSkillTrainings] = useState<string[]>([]);
  const [trainingOrganizers, setTrainingOrganizers] = useState<string[]>([]);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    selectedDisabilityTypes.forEach(type => formData.append('disabilityTypes', type));
    selectedDiscriminationTypes.forEach(type => formData.append('discriminationTypes', type));
    selectedDiscriminationPerpetrators.forEach(type => formData.append('discriminationPerpetrators', type));
    otherSocialAssistance.filter(item => item.trim() !== '').forEach(item => formData.append('otherSocialAssistance', item));
    skillTrainingTypes.forEach(type => formData.append('skillTrainingTypes', type));
    desiredSkillTrainings.forEach(training => formData.append('desiredSkillTrainings', training));
    trainingOrganizers.forEach(organizer => formData.append('trainingOrganizers', organizer));


    const result = await addCommunityMember(formData);

    if (result?.error) {
      setMessage(`Error: ${result.error}`);
      toast.error('Gagal mengirim data', {
        description: result.error,
      });
    } else if (result?.success) {
      setMessage(result.success);
      toast.success('Data berhasil dikirim!', {
        description: 'Terima kasih telah mengisi formulir pendataan komunitas.',
      });
      
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      formRef.current?.reset(); // Reset form on success
      
      // Reset all state variables
      setHasReceivedTraining(false);
      setEmploymentStatus("");
      setHasEktp(false);
      setHasOwnBusiness(false);
      setIsStillStudying(false);
      setEducationLevel("");
      setDateOfBirth("");
      setAge("");
      setSocialSecurityType("");
      setDiscriminationExperience("");
      setHasDiscrimination(false);
      setIsPersonWithDisability(false);
      setSelectedDisabilityTypes([]);
      setSelectedDiscriminationTypes([]);
      setSelectedDiscriminationPerpetrators([]);
      setOtherSocialAssistance(['']);
      setSkillTrainingTypes([]);
      setDesiredSkillTrainings([]);
      setTrainingOrganizers([]);
    } else {
      setMessage('Terjadi kesalahan yang tidak diketahui.');
      toast.error('Terjadi kesalahan', {
        description: 'Tidak dapat mengirim data. Silakan coba lagi.',
      });
    }
    setIsLoading(false);
  }

  const commonInputStyle = "mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const commonLabelStyle = "block text-sm font-medium text-slate-700 mb-1";

  const handleOtherSocialAssistanceChange = (index: number, value: string) => {
    const newAssistance = [...otherSocialAssistance];
    newAssistance[index] = value;
    setOtherSocialAssistance(newAssistance);
  };

  const addOtherSocialAssistanceField = () => {
    setOtherSocialAssistance([...otherSocialAssistance, '']);
  };

  const removeOtherSocialAssistanceField = (index: number) => {
    const newAssistance = [...otherSocialAssistance];
    newAssistance.splice(index, 1);
    setOtherSocialAssistance(newAssistance.length > 0 ? newAssistance : ['']); // Ensure at least one field if all removed
  };


  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white py-8 rounded-lg shadow-md w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-slate-200">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Formulir Data Komunitas</h2>

      {message && <p className={`p-3 rounded-md ${message.startsWith('Error:') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>{message}</p>}

      <PersonalDataSection
        dateOfBirth={dateOfBirth}
        age={age}
        setDateOfBirth={setDateOfBirth}
        setAge={setAge}
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <ResidencyDataSection
        hasEktp={hasEktp}
        setHasEktp={setHasEktp}
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <AddressSection
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <ContactSection
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <SocialEconomicSection
        educationLevel={educationLevel}
        setEducationLevel={setEducationLevel}
        isStillStudying={isStillStudying}
        setIsStillStudying={setIsStillStudying}
        employmentStatus={employmentStatus}
        setEmploymentStatus={setEmploymentStatus}
        hasOwnBusiness={hasOwnBusiness}
        setHasOwnBusiness={setHasOwnBusiness}
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <TrainingSection
        hasReceivedTraining={hasReceivedTraining}
        setHasReceivedTraining={setHasReceivedTraining}
        skillTrainingTypes={skillTrainingTypes}
        setSkillTrainingTypes={setSkillTrainingTypes}
        desiredSkillTrainings={desiredSkillTrainings}
        setDesiredSkillTrainings={setDesiredSkillTrainings}
        trainingOrganizers={trainingOrganizers}
        setTrainingOrganizers={setTrainingOrganizers}
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <SocialSecuritySection
        socialSecurityType={socialSecurityType}
        onSocialSecurityTypeChange={setSocialSecurityType}
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <HealthSection
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <DisabilitySection
        isPersonWithDisability={isPersonWithDisability}
        setIsPersonWithDisability={setIsPersonWithDisability}
        selectedDisabilityTypes={selectedDisabilityTypes}
        setSelectedDisabilityTypes={setSelectedDisabilityTypes}
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <DiscriminationSection
        discriminationExperience={discriminationExperience}
        onDiscriminationExperienceChange={(value) => {
          setDiscriminationExperience(value);
          setHasDiscrimination(value === "PERNAH_MENGALAMI");
        }}
        selectedDiscriminationTypes={selectedDiscriminationTypes}
        onDiscriminationTypesChange={setSelectedDiscriminationTypes}
        selectedDiscriminationPerpetrators={selectedDiscriminationPerpetrators}
        onDiscriminationPerpetratorsChange={setSelectedDiscriminationPerpetrators}
        hasDiscrimination={hasDiscrimination}
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <SocialAssistanceSection
        otherSocialAssistance={otherSocialAssistance}
        onOtherSocialAssistanceChange={handleOtherSocialAssistanceChange}
        onAddOtherSocialAssistanceField={addOtherSocialAssistanceField}
        onRemoveOtherSocialAssistanceField={removeOtherSocialAssistanceField}
        commonInputStyle={commonInputStyle}
        commonLabelStyle={commonLabelStyle}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200"
      >
        {isLoading ? 'Mengirim...' : 'Kirim Data'}
      </button>
    </form>
  );
}
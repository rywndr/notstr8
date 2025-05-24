'use client';

import { useState } from 'react';
import { updateMember } from '@/actions/communityMember';
import { CommunityMember } from '../../../prisma/app/generated/prisma';
import { 
  handleDigitInput, 
  handlePhoneInput, 
  handleRupiahInput,
  handleDateOfBirthChange,
  handleAgeChange
} from '@/utils/formHandlers';
import Link from 'next/link';
import { toast } from 'sonner';

interface EditMemberFormProps {
  member: CommunityMember;
  isUserEdit?: boolean;
}

export function EditMemberForm({ member, isUserEdit = false }: EditMemberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format phone number for display (remove +62 prefix)
  const formatPhoneNumber = (phone: string | null) => {
    if (!phone) return '';
    return phone.startsWith('+62') ? phone.slice(3) : phone;
  };

  // Format date for input
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  // Calculate age from date
  const calculateAge = (dateOfBirth: Date | null) => {
    if (!dateOfBirth) return '';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const [formData, setFormData] = useState({
    firstName: member.firstName || '',
    middleName: member.middleName || '',
    lastName: member.lastName || '',
    communityNickname: member.communityNickname || '',
    placeOfBirth: member.placeOfBirth || '',
    dateOfBirth: formatDate(member.dateOfBirth),
    age: member.age?.toString() || calculateAge(member.dateOfBirth),
    gender: member.gender || '',
    genderIdentity: member.genderIdentity || '',
    nik: member.nik || '',
    familyCardNumber: member.familyCardNumber || '',
    ektpStatus: member.ektpStatus || '',
    address: member.address || '',
    domicileKelurahan: member.domicileKelurahan || '',
    domicileKecamatan: member.domicileKecamatan || '',
    domicileRegencyCity: member.domicileRegencyCity || '',
    city: member.city || '',
    residencyStatus: member.residencyStatus || '',
    livingSituation: member.livingSituation || '',
    phoneNumber: formatPhoneNumber(member.phoneNumber),
    maritalStatus: member.maritalStatus || '',
    lastEducation: member.lastEducation || '',
    isStillStudying: member.isStillStudying || false,
    employmentStatus: member.employmentStatus || '',
    jobDescription: member.jobDescription || '',
    monthlyIncome: member.monthlyIncome || '',
    hasOwnBusiness: member.hasOwnBusiness || false,
    businessDetails: member.businessDetails || '',
    hasReceivedSkillTraining: member.hasReceivedSkillTraining || false,
    skillTrainingType: member.skillTrainingType || '',
    desiredSkillTraining: member.desiredSkillTraining || '',
    hasBpjs: member.hasBpjs || false,
    bpjsId: member.bpjsId || '',
    healthServiceAccess: member.healthServiceAccess || '',
    chronicIllness: member.chronicIllness || '',
    discriminationExperience: member.discriminationExperience || '',
    discriminationType: member.discriminationType || '',
    discriminationPerpetrator: member.discriminationPerpetrator || '',
    discriminationLocation: member.discriminationLocation || '',
    wasDiscriminationReported: member.wasDiscriminationReported || false,
    receivesSocialAssistance: member.receivesSocialAssistance || false,
    isRegisteredInDTKS: member.isRegisteredInDTKS || false,
    communityGroup: member.communityGroup || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process phone number - fix the double prefix issue
      let processedPhoneNumber = null;
      if (formData.phoneNumber) {
        // If it already starts with +62, don't add it again
        if (formData.phoneNumber.startsWith('+62')) {
          processedPhoneNumber = formData.phoneNumber;
        } else {
          processedPhoneNumber = `+62${formData.phoneNumber}`;
        }
      }

      const processedData = {
        ...formData,
        phoneNumber: processedPhoneNumber,
        age: formData.age ? parseInt(formData.age, 10) : null,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
      };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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
        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Data Pribadi</legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className={commonLabelStyle}>Nama Depan (Wajib)</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={commonInputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="middleName" className={commonLabelStyle}>Nama Tengah</label>
              <input
                type="text"
                name="middleName"
                id="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className={commonInputStyle}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={commonLabelStyle}>Nama Belakang</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={commonInputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="communityNickname" className={commonLabelStyle}>Nama Alias/Panggilan Komunitas</label>
              <input
                type="text"
                name="communityNickname"
                id="communityNickname"
                value={formData.communityNickname}
                onChange={handleChange}
                className={commonInputStyle}
              />
            </div>
            <div>
              <label htmlFor="placeOfBirth" className={commonLabelStyle}>Tempat Lahir</label>
              <input
                type="text"
                name="placeOfBirth"
                id="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                className={commonInputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="dateOfBirth" className={commonLabelStyle}>Tanggal Lahir</label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => {
                  handleDateOfBirthChange(e, 
                    (value) => setFormData(prev => ({ ...prev, dateOfBirth: value })),
                    (value) => setFormData(prev => ({ ...prev, age: value }))
                  );
                }}
                className={commonInputStyle}
              />
            </div>
            <div>
              <label htmlFor="age" className={commonLabelStyle}>Usia</label>
              <input
                type="text"
                name="age"
                id="age"
                value={formData.age}
                onChange={(e) => {
                  handleAgeChange(e,
                    (value) => setFormData(prev => ({ ...prev, age: value })),
                    (value) => setFormData(prev => ({ ...prev, dateOfBirth: value }))
                  );
                }}
                className={`${commonInputStyle} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="gender" className={commonLabelStyle}>Jenis Kelamin</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className={commonInputStyle}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="PRIA">Pria</option>
                <option value="WANITA">Wanita</option>
              </select>
            </div>
            <div>
              <label htmlFor="genderIdentity" className={commonLabelStyle}>Identitas Gender</label>
              <select
                name="genderIdentity"
                id="genderIdentity"
                value={formData.genderIdentity}
                onChange={handleChange}
                className={commonInputStyle}
              >
                <option value="">Pilih Identitas Gender</option>
                <option value="NONE">None</option>
                <option value="WARIA">Waria</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Data Kependudukan</legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nik" className={commonLabelStyle}>NIK (Nomor Induk Kependudukan)</label>
              <input
                type="text"
                name="nik"
                id="nik"
                value={formData.nik}
                onChange={handleChange}
                onInput={handleDigitInput}
                maxLength={16}
                className={commonInputStyle}
                placeholder="Contoh: 1234567890123456"
              />
            </div>
            <div>
              <label htmlFor="familyCardNumber" className={commonLabelStyle}>Nomor Kartu Keluarga (KK)</label>
              <input
                type="text"
                name="familyCardNumber"
                id="familyCardNumber"
                value={formData.familyCardNumber}
                onChange={handleChange}
                onInput={handleDigitInput}
                maxLength={16}
                className={commonInputStyle}
                placeholder="Contoh: 1234567890123456"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="ektpStatus" className={commonLabelStyle}>Status Kepemilikan E-KTP</label>
            <select
              name="ektpStatus"
              id="ektpStatus"
              value={formData.ektpStatus}
              onChange={handleChange}
              className={commonInputStyle}
            >
              <option value="">Pilih Status E-KTP</option>
              <option value="MEMILIKI">Memiliki</option>
              <option value="TIDAK_MEMILIKI">Tidak Memiliki</option>
              <option value="DALAM_PROSES">Dalam Proses</option>
            </select>
          </div>

          <div className={`mb-4 ${formData.ektpStatus !== "MEMILIKI" ? 'opacity-50' : ''}`}>
            <label htmlFor="idScanUrl" className={commonLabelStyle}>Pindaian KTP (Gambar)</label>
            <input 
              type="file" 
              name="idScanUrl" 
              id="idScanUrl" 
              accept="image/*" 
              className={`${commonInputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100`}
              disabled={formData.ektpStatus !== "MEMILIKI"}
            />
            {member.idScanUrl && (
              <p className="mt-1 text-xs text-slate-500">
                File saat ini: {member.idScanUrl}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Alamat Domisili</legend>
          
          <div className="mb-4">
            <label htmlFor="address" className={commonLabelStyle}>Alamat Lengkap (Jalan, Nomor, RT/RW)</label>
            <textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className={commonInputStyle}
              placeholder="Contoh: Jl. Kuantan No. 123, RT 001/RW 002"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="domicileKelurahan" className={commonLabelStyle}>Kelurahan Domisili</label>
              <input
                type="text"
                name="domicileKelurahan"
                id="domicileKelurahan"
                value={formData.domicileKelurahan}
                onChange={handleChange}
                className={commonInputStyle}
                placeholder="Contoh: Bukit Cermin"
              />
            </div>
            <div>
              <label htmlFor="domicileKecamatan" className={commonLabelStyle}>Kecamatan Domisili</label>
              <input
                type="text"
                name="domicileKecamatan"
                id="domicileKecamatan"
                value={formData.domicileKecamatan}
                onChange={handleChange}
                className={commonInputStyle}
                placeholder="Contoh: Bukit Bestari"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="domicileRegencyCity" className={commonLabelStyle}>Kabupaten/Kota Domisili</label>
              <input
                type="text"
                name="domicileRegencyCity"
                id="domicileRegencyCity"
                value={formData.domicileRegencyCity}
                onChange={handleChange}
                className={commonInputStyle}
                placeholder="Contoh: Kepulauan Riau/Kota Tanjungpinang"
              />
            </div>
            <div>
              <label htmlFor="city" className={commonLabelStyle}>Kota (Wajib)</label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className={commonInputStyle}
                placeholder="Contoh: Tanjungpinang"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="residencyStatus" className={commonLabelStyle}>Status Kependudukan</label>
              <select
                name="residencyStatus"
                id="residencyStatus"
                value={formData.residencyStatus}
                onChange={handleChange}
                className={commonInputStyle}
              >
                <option value="">Pilih Status Kependudukan</option>
                <option value="PENDATANG">Pendatang</option>
                <option value="PENDUDUK_TETAP">Penduduk Tetap</option>
              </select>
            </div>
            <div>
              <label htmlFor="livingSituation" className={commonLabelStyle}>Status Tempat Tinggal</label>
              <select
                name="livingSituation"
                id="livingSituation"
                value={formData.livingSituation}
                onChange={handleChange}
                className={commonInputStyle}
              >
                <option value="">Pilih Status Tempat Tinggal</option>
                <option value="BERSAMA_ORANG_TUA">Bersama Orang Tua</option>
                <option value="RUMAH_PRIBADI">Rumah Pribadi</option>
                <option value="SEWA_KONTRAK">Sewa/Kontrak</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Kontak</legend>
          
          <div className="mb-4">
            <label htmlFor="phoneNumber" className={commonLabelStyle}>Kontak Yang Bisa Dihubungi</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                +62
              </span>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onInput={handlePhoneInput}
                className={`${commonInputStyle} pl-12`}
                placeholder="81234567890"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Format: +62 8xxx-xxxx-xxx (hanya masukkan angka setelah +62, harus diawali dengan 8)
            </p>
          </div>
        </fieldset>

        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Status Sosial & Ekonomi</legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="maritalStatus" className={commonLabelStyle}>Status Perkawinan</label>
              <select
                name="maritalStatus"
                id="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className={commonInputStyle}
              >
                <option value="">Pilih Status Perkawinan</option>
                <option value="BELUM_KAWIN">Belum Kawin</option>
                <option value="KAWIN">Kawin</option>
                <option value="CERAI">Cerai</option>
              </select>
            </div>
            <div>
              <label htmlFor="lastEducation" className={commonLabelStyle}>Pendidikan Terakhir</label>
              <select
                name="lastEducation"
                id="lastEducation"
                value={formData.lastEducation}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value === "TIDAK_SEKOLAH") {
                    setFormData(prev => ({ ...prev, isStillStudying: false }));
                  }
                }}
                className={commonInputStyle}
              >
                <option value="">Pilih Pendidikan</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA_SMK">SMA/SMK</option>
                <option value="PERGURUAN_TINGGI">Perguruan Tinggi</option>
                <option value="TIDAK_SEKOLAH">Tidak Sekolah</option>
              </select>
            </div>
          </div>

          <div className={`flex items-center mt-2 mb-4 ${formData.lastEducation === "TIDAK_SEKOLAH" ? 'opacity-50' : ''}`}>
            <input
              type="checkbox"
              name="isStillStudying"
              id="isStillStudying"
              checked={formData.isStillStudying}
              onChange={handleChange}
              disabled={formData.lastEducation === "TIDAK_SEKOLAH"}
              className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
            />
            <label htmlFor="isStillStudying" className="ml-2 block text-sm text-slate-900">Masih Sekolah/Kuliah?</label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="employmentStatus" className={commonLabelStyle}>Status Pekerjaan</label>
              <select
                name="employmentStatus"
                id="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className={commonInputStyle}
              >
                <option value="">Pilih Status Pekerjaan</option>
                <option value="BEKERJA">Bekerja</option>
                <option value="TIDAK_BEKERJA">Tidak Bekerja</option>
                <option value="PELAJAR">Pelajar</option>
                <option value="MAHASISWA">Mahasiswa</option>
              </select>
            </div>
            <div className={`${formData.employmentStatus !== "BEKERJA" ? 'opacity-50' : ''}`}>
              <label htmlFor="jobDescription" className={commonLabelStyle}>Jenis Pekerjaan</label>
              <input
                type="text"
                name="jobDescription"
                id="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                disabled={formData.employmentStatus !== "BEKERJA"}
                className={commonInputStyle}
                placeholder="Contoh: Karyawan Swasta, Wirausaha, PNS"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="monthlyIncome" className={commonLabelStyle}>Pendapatan Bulanan</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                Rp
              </span>
              <input
                type="text"
                name="monthlyIncome"
                id="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                onInput={handleRupiahInput}
                className={`${commonInputStyle} pl-10`}
                placeholder="1.000.000"
              />
            </div>
          </div>

          <div className="flex items-center mt-2 mb-4">
            <input
              type="checkbox"
              name="hasOwnBusiness"
              id="hasOwnBusiness"
              checked={formData.hasOwnBusiness}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
            />
            <label htmlFor="hasOwnBusiness" className="ml-2 block text-sm text-slate-900">Memiliki Usaha Sendiri?</label>
          </div>

          <div className={`mb-4 ${!formData.hasOwnBusiness ? 'opacity-50' : ''}`}>
            <label htmlFor="businessDetails" className={commonLabelStyle}>Detail Usaha</label>
            <input
              type="text"
              name="businessDetails"
              id="businessDetails"
              value={formData.businessDetails}
              onChange={handleChange}
              disabled={!formData.hasOwnBusiness}
              className={commonInputStyle}
              placeholder="Contoh: Warung Makan, Toko Online, Jasa Jahit"
            />
          </div>
        </fieldset>

        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Pelatihan</legend>
          
          <div className="flex items-center mt-2 mb-4">
            <input
              type="checkbox"
              name="hasReceivedSkillTraining"
              id="hasReceivedSkillTraining"
              checked={formData.hasReceivedSkillTraining}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
            />
            <label htmlFor="hasReceivedSkillTraining" className="ml-2 block text-sm text-slate-900">Pernah Menerima Pelatihan Keterampilan Usaha?</label>
          </div>

          <div className={`mb-4 ${!formData.hasReceivedSkillTraining ? 'opacity-50' : ''}`}>
            <label htmlFor="skillTrainingType" className={commonLabelStyle}>Jenis Pelatihan yang Pernah Diikuti</label>
            <input
              type="text"
              name="skillTrainingType"
              id="skillTrainingType"
              value={formData.skillTrainingType}
              onChange={handleChange}
              disabled={!formData.hasReceivedSkillTraining}
              className={commonInputStyle}
              placeholder="Contoh: Pelatihan Digital Marketing"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="desiredSkillTraining" className={commonLabelStyle}>Pelatihan yang Diinginkan</label>
            <input
              type="text"
              name="desiredSkillTraining"
              id="desiredSkillTraining"
              value={formData.desiredSkillTraining}
              onChange={handleChange}
              className={commonInputStyle}
              placeholder="Contoh: Pelatihan Kewirausahaan"
            />
          </div>
        </fieldset>

        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Informasi BPJS</legend>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="hasBpjs"
              id="hasBpjs"
              checked={formData.hasBpjs}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
            />
            <label htmlFor="hasBpjs" className="ml-2 block text-sm text-slate-900">Apakah memiliki BPJS?</label>
          </div>

          <div className={`mb-4 ${!formData.hasBpjs ? 'opacity-50' : ''}`}>
            <label htmlFor="bpjsId" className={commonLabelStyle}>Nomor BPJS</label>
            <input
              type="text"
              name="bpjsId"
              id="bpjsId"
              value={formData.bpjsId}
              onChange={handleChange}
              onInput={handleDigitInput}
              disabled={!formData.hasBpjs}
              className={commonInputStyle}
              placeholder="Contoh: 0001234567890"
            />
          </div>

          <div className={`mb-4 ${!formData.hasBpjs ? 'opacity-50' : ''}`}>
            <label htmlFor="bpjsScanUrl" className={commonLabelStyle}>Pindaian Kartu BPJS (Gambar)</label>
            <input 
              type="file" 
              name="bpjsScanUrl" 
              id="bpjsScanUrl" 
              accept="image/*" 
              className={`${commonInputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100`} 
              disabled={!formData.hasBpjs}
            />
            {member.bpjsScanUrl && (
              <p className="mt-1 text-xs text-slate-500">
                File saat ini: {member.bpjsScanUrl}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Data Kesehatan</legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="healthServiceAccess" className={commonLabelStyle}>Akses Layanan Kesehatan Terakhir/Rutin</label>
              <select
                name="healthServiceAccess"
                id="healthServiceAccess"
                value={formData.healthServiceAccess}
                onChange={handleChange}
                className={commonInputStyle}
              >
                <option value="">Pilih Layanan</option>
                <option value="PUSKESMAS">Puskesmas</option>
                <option value="RUMAH_SAKIT">Rumah Sakit</option>
                <option value="KLINIK">Klinik</option>
                <option value="TIDAK_PERNAH">Tidak Pernah</option>
              </select>
            </div>
            <div>
              <label htmlFor="chronicIllness" className={commonLabelStyle}>Penyakit Kronis atau Kondisi Kesehatan Khusus</label>
              <input
                type="text"
                name="chronicIllness"
                id="chronicIllness"
                value={formData.chronicIllness}
                onChange={handleChange}
                className={commonInputStyle}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Pengalaman Diskriminasi/Kekerasan</legend>
          
          <div className="mb-4">
            <label htmlFor="discriminationExperience" className={commonLabelStyle}>Pernah Mengalami Diskriminasi atau Kekerasan?</label>
            <select
              name="discriminationExperience"
              id="discriminationExperience"
              value={formData.discriminationExperience}
              onChange={handleChange}
              className={commonInputStyle}
            >
              <option value="">Pilih Pengalaman</option>
              <option value="TIDAK_PERNAH">Tidak Pernah</option>
              <option value="PERNAH_MENGALAMI">Pernah Mengalami</option>
            </select>
          </div>

          <div className={`mb-4 ${formData.discriminationExperience !== "PERNAH_MENGALAMI" ? 'opacity-50' : ''}`}>
            <label htmlFor="discriminationType" className={commonLabelStyle}>Jenis Diskriminasi/Kekerasan</label>
            <input
              type="text"
              name="discriminationType"
              id="discriminationType"
              value={formData.discriminationType}
              onChange={handleChange}
              disabled={formData.discriminationExperience !== "PERNAH_MENGALAMI"}
              className={commonInputStyle}
              placeholder="Contoh: Diskriminasi di tempat kerja"
            />
          </div>

          <div className={`mb-4 ${formData.discriminationExperience !== "PERNAH_MENGALAMI" ? 'opacity-50' : ''}`}>
            <label htmlFor="discriminationPerpetrator" className={commonLabelStyle}>Pelaku Diskriminasi/Kekerasan</label>
            <input
              type="text"
              name="discriminationPerpetrator"
              id="discriminationPerpetrator"
              value={formData.discriminationPerpetrator}
              onChange={handleChange}
              disabled={formData.discriminationExperience !== "PERNAH_MENGALAMI"}
              className={commonInputStyle}
              placeholder="Contoh: Atasan, rekan kerja"
            />
          </div>

          <div className={`mb-4 ${formData.discriminationExperience !== "PERNAH_MENGALAMI" ? 'opacity-50' : ''}`}>
            <label htmlFor="discriminationLocation" className={commonLabelStyle}>Lokasi Kejadian</label>
            <input
              type="text"
              name="discriminationLocation"
              id="discriminationLocation"
              value={formData.discriminationLocation}
              onChange={handleChange}
              disabled={formData.discriminationExperience !== "PERNAH_MENGALAMI"}
              className={commonInputStyle}
              placeholder="Contoh: Kantor, sekolah, tempat umum"
            />
          </div>

          <div className={`flex items-center mt-2 mb-4 ${formData.discriminationExperience !== "PERNAH_MENGALAMI" ? 'opacity-50' : ''}`}>
            <input
              type="checkbox"
              name="wasDiscriminationReported"
              id="wasDiscriminationReported"
              checked={formData.wasDiscriminationReported}
              onChange={handleChange}
              disabled={formData.discriminationExperience !== "PERNAH_MENGALAMI"}
              className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
            />
            <label htmlFor="wasDiscriminationReported" className="ml-2 block text-sm text-slate-900">Apakah Diskriminasi/Kekerasan Telah Dilaporkan?</label>
          </div>
        </fieldset>

        <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
          <legend className="text-lg font-semibold text-slate-700 px-2">Bantuan Sosial & Komunitas</legend>
          
          <div className="flex items-center mt-2 mb-4">
            <input
              type="checkbox"
              name="receivesSocialAssistance"
              id="receivesSocialAssistance"
              checked={formData.receivesSocialAssistance}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
            />
            <label htmlFor="receivesSocialAssistance" className="ml-2 block text-sm text-slate-900">Mendapatkan Bantuan Sosial dari Pemerintah?</label>
          </div>

          <div className="flex items-center mt-2 mb-4">
            <input
              type="checkbox"
              name="isRegisteredInDTKS"
              id="isRegisteredInDTKS"
              checked={formData.isRegisteredInDTKS}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
            />
            <label htmlFor="isRegisteredInDTKS" className="ml-2 block text-sm text-slate-900">Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS)?</label>
          </div>

          <div className="mb-4">
            <label htmlFor="communityGroup" className={commonLabelStyle}>Kelompok Komunitas yang Diikuti</label>
            <input
              type="text"
              name="communityGroup"
              id="communityGroup"
              value={formData.communityGroup}
              onChange={handleChange}
              className={commonInputStyle}
            />
          </div>
        </fieldset>

        <div className="flex gap-3 pt-6">
          <Link
            href={isUserEdit ? '/' : '/admin'}
            className="flex-1 text-center px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition-colors"
          >
            {isUserEdit ? 'Kembali' : 'Batal'}
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-slate-700 hover:bg-slate-800 disabled:bg-slate-300 text-white py-2.5 px-4 rounded-md font-medium transition-colors"
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}
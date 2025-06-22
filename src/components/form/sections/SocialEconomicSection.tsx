'use client';

import { handleRupiahInput } from '@/utils/formHandlers';

interface SocialEconomicSectionProps {
  commonInputStyle: string;
  commonLabelStyle: string;
  employmentStatus: string;
  setEmploymentStatus: (value: string) => void;
  hasOwnBusiness: boolean;
  setHasOwnBusiness: (value: boolean) => void;
  isStillStudying: boolean;
  setIsStillStudying: (value: boolean) => void;
  educationLevel: string;
  setEducationLevel: (value: string) => void;
  initialData?: {
    maritalStatus?: string;
    jobDescription?: string;
    monthlyIncome?: string;
    businessDetails?: string;
  };
}

export function SocialEconomicSection({
  commonInputStyle,
  commonLabelStyle,
  employmentStatus,
  setEmploymentStatus,
  hasOwnBusiness,
  setHasOwnBusiness,
  isStillStudying,
  setIsStillStudying,
  educationLevel,
  setEducationLevel,
  initialData
}: SocialEconomicSectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Status Sosial & Ekonomi</legend>
      
      <div className="mb-4">
        <label htmlFor="maritalStatus" className={commonLabelStyle}>Status Perkawinan</label>
        <select name="maritalStatus" id="maritalStatus" className={commonInputStyle} defaultValue={initialData?.maritalStatus || ''}>
          <option value="">Pilih Status Perkawinan</option>
          <option value="BELUM_KAWIN">Belum Kawin</option>
          <option value="KAWIN">Kawin</option>
          <option value="CERAI">Cerai</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="lastEducation" className={commonLabelStyle}>Pendidikan Terakhir</label>
        <select 
          name="lastEducation" 
          id="lastEducation" 
          className={commonInputStyle}
          value={educationLevel}
          onChange={(e) => {
            setEducationLevel(e.target.value);
            if (e.target.value === "TIDAK_SEKOLAH") {
              setIsStillStudying(false);
            }
          }}
        >
          <option value="">Pilih Pendidikan</option>
          <option value="SD">SD</option>
          <option value="SMP">SMP</option>
          <option value="SMA_SMK">SMA/SMK</option>
          <option value="PERGURUAN_TINGGI">Perguruan Tinggi</option>
          <option value="TIDAK_SEKOLAH">Tidak Sekolah</option>
        </select>
      </div>
      
      <div className={`flex items-center mt-2 mb-4 ${educationLevel === "TIDAK_SEKOLAH" ? 'opacity-50' : ''}`}>
        <input 
          type="checkbox" 
          name="isStillStudying" 
          id="isStillStudying" 
          className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
          checked={isStillStudying}
          onChange={(e) => setIsStillStudying(e.target.checked)}
          disabled={educationLevel === "TIDAK_SEKOLAH"}
        />
        <label htmlFor="isStillStudying" className="ml-2 block text-sm text-slate-900">Masih Sekolah/Kuliah?</label>
      </div>
      
      <div className="mb-4">
        <label htmlFor="employmentStatus" className={commonLabelStyle}>Status Pekerjaan</label>
        <select 
          name="employmentStatus" 
          id="employmentStatus" 
          className={commonInputStyle}
          onChange={(e) => setEmploymentStatus(e.target.value)}
          value={employmentStatus}
        >
          <option value="">Pilih Status Pekerjaan</option>
          <option value="BEKERJA">Bekerja</option>
          <option value="TIDAK_BEKERJA">Tidak Bekerja</option>
          <option value="PELAJAR">Pelajar</option>
          <option value="MAHASISWA">Mahasiswa</option>
        </select>
      </div>
      
      <div className={`mb-4 ${employmentStatus !== "BEKERJA" ? 'opacity-50' : ''}`}>
        <label htmlFor="jobDescription" className={commonLabelStyle}>Jenis Pekerjaan</label>
        <input 
          type="text" 
          name="jobDescription" 
          id="jobDescription" 
          className={commonInputStyle} 
          placeholder="Contoh: Karyawan Swasta, Wirausaha, PNS"
          defaultValue={initialData?.jobDescription || ''}
          disabled={employmentStatus !== "BEKERJA"}
        />
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
            className={`${commonInputStyle} pl-10`} 
            placeholder="1.000.000" 
            defaultValue={initialData?.monthlyIncome || ''}
            onInput={handleRupiahInput}
          />
        </div>
      </div>
      
      <div className="flex items-center mt-2 mb-4">
        <input 
          type="checkbox" 
          name="hasOwnBusiness" 
          id="hasOwnBusiness" 
          className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
          onChange={(e) => setHasOwnBusiness(e.target.checked)}
          checked={hasOwnBusiness}
        />
        <label htmlFor="hasOwnBusiness" className="ml-2 block text-sm text-slate-900">Memiliki Usaha Sendiri?</label>
      </div>
      
      <div className={`mb-4 ${!hasOwnBusiness ? 'opacity-50' : ''}`}>
        <label htmlFor="businessDetails" className={commonLabelStyle}>Detail Usaha</label>
        <input 
          type="text" 
          name="businessDetails" 
          id="businessDetails" 
          className={commonInputStyle} 
          placeholder="Contoh: Warung Makan, Toko Online, Jasa Jahit"
          defaultValue={initialData?.businessDetails || ''}
          disabled={!hasOwnBusiness}
        />
      </div>
    </fieldset>
  );
}

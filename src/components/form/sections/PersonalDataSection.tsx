'use client';

import { handleDateOfBirthChange, handleAgeChange } from '@/utils/formHandlers';

interface PersonalDataSectionProps {
  commonInputStyle: string;
  commonLabelStyle: string;
  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  initialData?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    communityNickname?: string;
    placeOfBirth?: string;
    gender?: string;
    genderIdentity?: string;
  };
}

export function PersonalDataSection({
  commonInputStyle,
  commonLabelStyle,
  dateOfBirth,
  setDateOfBirth,
  age,
  setAge,
  initialData
}: PersonalDataSectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Data Pribadi</legend>

      <div className="mb-4">
        <label htmlFor="firstName" className={commonLabelStyle}>Nama Depan (Wajib)</label>
        <input 
          type="text" 
          name="firstName" 
          id="firstName" 
          required 
          className={commonInputStyle}
          defaultValue={initialData?.firstName || ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="middleName" className={commonLabelStyle}>Nama Tengah</label>
        <input 
          type="text" 
          name="middleName" 
          id="middleName" 
          className={commonInputStyle}
          defaultValue={initialData?.middleName || ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className={commonLabelStyle}>Nama Belakang</label>
        <input 
          type="text" 
          name="lastName" 
          id="lastName" 
          className={commonInputStyle}
          defaultValue={initialData?.lastName || ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="communityNickname" className={commonLabelStyle}>Nama Alias/Panggilan Komunitas</label>
        <input 
          type="text" 
          name="communityNickname" 
          id="communityNickname" 
          className={commonInputStyle}
          defaultValue={initialData?.communityNickname || ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="placeOfBirth" className={commonLabelStyle}>Tempat Lahir</label>
        <input 
          type="text" 
          name="placeOfBirth" 
          id="placeOfBirth" 
          className={commonInputStyle}
          defaultValue={initialData?.placeOfBirth || ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dateOfBirth" className={commonLabelStyle}>Tanggal Lahir</label>
        <input 
          type="date" 
          name="dateOfBirth" 
          id="dateOfBirth" 
          className={commonInputStyle}
          value={dateOfBirth}
          onChange={(e) => handleDateOfBirthChange(e, setDateOfBirth, setAge)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="age" className={commonLabelStyle}>Usia</label>
        <input 
          type="text" 
          name="age" 
          id="age" 
          className={`${commonInputStyle} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} 
          value={age}
          onChange={(e) => handleAgeChange(e, setAge, setDateOfBirth)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="gender" className={commonLabelStyle}>Jenis Kelamin</label>
        <select 
          name="gender" 
          id="gender" 
          className={commonInputStyle}
          defaultValue={initialData?.gender || ''}
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="PRIA">Pria</option>
          <option value="WANITA">Wanita</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="genderIdentity" className={commonLabelStyle}>Identitas Gender</label>
        <select 
          name="genderIdentity" 
          id="genderIdentity" 
          className={commonInputStyle}
          defaultValue={initialData?.genderIdentity || ''}
        >
          <option value="">Pilih Identitas Gender</option>
          <option value="NONE">None</option>
          <option value="WARIA">Waria</option>
        </select>
      </div>
    </fieldset>
  );
}

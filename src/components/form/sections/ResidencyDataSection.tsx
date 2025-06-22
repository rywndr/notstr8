'use client';

import { handleDigitInput } from '@/utils/formHandlers';

interface ResidencyDataSectionProps {
  commonInputStyle: string;
  commonLabelStyle: string;
  hasEktp: boolean;
  setHasEktp: (value: boolean) => void;
  initialData?: {
    nik?: string;
    familyCardNumber?: string;
    ektpStatus?: string;
    residencyStatus?: string;
    livingSituation?: string;
  };
}

export function ResidencyDataSection({
  commonInputStyle,
  commonLabelStyle,
  hasEktp,
  setHasEktp,
  initialData
}: ResidencyDataSectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Data Kependudukan</legend>
      
      <div className="mb-4">
        <label htmlFor="nik" className={commonLabelStyle}>NIK (Nomor Induk Kependudukan)</label>
        <input 
          type="text" 
          name="nik" 
          id="nik" 
          className={commonInputStyle} 
          placeholder="Contoh: 1234567890123456" 
          maxLength={16} 
          onInput={handleDigitInput}
          defaultValue={initialData?.nik || ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="familyCardNumber" className={commonLabelStyle}>Nomor Kartu Keluarga (KK)</label>
        <input 
          type="text" 
          name="familyCardNumber" 
          id="familyCardNumber" 
          className={commonInputStyle} 
          placeholder="Contoh: 1234567890123456" 
          maxLength={16} 
          onInput={handleDigitInput}
          defaultValue={initialData?.familyCardNumber || ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="ektpStatus" className={commonLabelStyle}>Status Kepemilikan E-KTP</label>
        <select 
          name="ektpStatus" 
          id="ektpStatus" 
          className={commonInputStyle}
          onChange={(e) => setHasEktp(e.target.value === "MEMILIKI")}
          defaultValue={initialData?.ektpStatus || ''}
        >
          <option value="">Pilih Status E-KTP</option>
          <option value="MEMILIKI">Memiliki</option>
          <option value="TIDAK_MEMILIKI">Tidak Memiliki</option>
          <option value="DALAM_PROSES">Dalam Proses</option>
        </select>
      </div>

      <div className={`mb-4 ${!hasEktp ? 'opacity-50' : ''}`}>
        <label htmlFor="idScanUrl" className={commonLabelStyle}>Pindaian KTP (Gambar)</label>
        <input 
          type="file" 
          name="idScanUrl" 
          id="idScanUrl" 
          accept="image/*" 
          className={`${commonInputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100`}
          disabled={!hasEktp}
        />
      </div>
    </fieldset>
  );
}

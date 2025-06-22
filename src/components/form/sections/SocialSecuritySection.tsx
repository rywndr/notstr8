'use client';

import { SocialSecurityType } from '../../../../prisma/app/generated/prisma';
import { handleDigitInput } from '@/utils/formHandlers';

interface SocialSecuritySectionProps {
  socialSecurityType: SocialSecurityType | "";
  onSocialSecurityTypeChange: (value: SocialSecurityType | "") => void;
  commonInputStyle: string;
  commonLabelStyle: string;
}

export function SocialSecuritySection({
  socialSecurityType,
  onSocialSecurityTypeChange,
  commonInputStyle,
  commonLabelStyle
}: SocialSecuritySectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Informasi Jaminan Sosial</legend>
      <div className="mb-4">
        <label htmlFor="socialSecurityType" className={commonLabelStyle}>Jenis Jaminan Sosial</label>
        <select 
          name="socialSecurityType" 
          id="socialSecurityType" 
          className={commonInputStyle}
          value={socialSecurityType}
          onChange={(e) => onSocialSecurityTypeChange(e.target.value as SocialSecurityType | "")}
        >
          <option value="">Pilih Jenis Jaminan Sosial</option>
          <option value={SocialSecurityType.NONE}>Tidak memiliki jaminan sosial</option>
          <option value={SocialSecurityType.BPJS_KESEHATAN}>BPJS Kesehatan</option>
          <option value={SocialSecurityType.BPJS_TK}>BPJS-TK</option>
          <option value={SocialSecurityType.OTHER}>Lainnya</option>
        </select>
      </div>

      {socialSecurityType === SocialSecurityType.OTHER && (
        <div className="mb-4">
          <label htmlFor="socialSecurityOther" className={commonLabelStyle}>Nama Jaminan Sosial Lainnya</label>
          <input 
            type="text" 
            name="socialSecurityOther" 
            id="socialSecurityOther" 
            className={commonInputStyle}
            placeholder="Sebutkan jenis jaminan sosial lainnya"
          />
        </div>
      )}

      <div className={`mb-4 ${socialSecurityType === SocialSecurityType.NONE || socialSecurityType === "" ? 'opacity-50' : ''}`}>
        <label htmlFor="socialSecurityId" className={commonLabelStyle}>Nomor Identitas Jaminan Sosial</label>
        <input 
          type="text" 
          name="socialSecurityId" 
          id="socialSecurityId" 
          className={commonInputStyle} 
          disabled={socialSecurityType === SocialSecurityType.NONE || socialSecurityType === ""} 
          placeholder="Contoh: 0001234567890"
          onInput={handleDigitInput}
        />
      </div>
      <div className={`mb-4 ${socialSecurityType === SocialSecurityType.NONE || socialSecurityType === "" ? 'opacity-50' : ''}`}>
        <label htmlFor="socialSecurityScanUrl" className={commonLabelStyle}>Pindaian Kartu Jaminan Sosial (Gambar)</label>
        <input 
          type="file" 
          name="socialSecurityScanUrl" 
          id="socialSecurityScanUrl" 
          accept="image/*" 
          className={`${commonInputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100`} 
          disabled={socialSecurityType === SocialSecurityType.NONE || socialSecurityType === ""}
        />
      </div>
    </fieldset>
  );
}

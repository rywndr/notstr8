'use client';

import { handlePhoneInput } from '@/utils/formHandlers';

interface ContactSectionProps {
  commonInputStyle: string;
  commonLabelStyle: string;
  initialData?: {
    phoneNumber?: string;
  };
}

export function ContactSection({ commonInputStyle, commonLabelStyle, initialData }: ContactSectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
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
            className={`${commonInputStyle} pl-12`} 
            placeholder="81234567890" 
            defaultValue={initialData?.phoneNumber?.replace('+62', '') || ''}
            onInput={handlePhoneInput}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Format: +62 8xxx-xxxx-xxx (hanya masukkan angka setelah +62, harus diawali dengan 8)
        </p>
      </div>
    </fieldset>
  );
}

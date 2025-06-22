'use client';

import { DisabilityType } from '../../../../prisma/app/generated/prisma';

interface DisabilitySectionProps {
  commonInputStyle: string;
  commonLabelStyle: string;
  isPersonWithDisability: boolean;
  setIsPersonWithDisability: (value: boolean) => void;
  selectedDisabilityTypes: DisabilityType[];
  setSelectedDisabilityTypes: (value: DisabilityType[]) => void;
  initialData?: {
    disabilityNotes?: string;
  };
}

export function DisabilitySection({
  commonInputStyle,
  commonLabelStyle,
  isPersonWithDisability,
  setIsPersonWithDisability,
  selectedDisabilityTypes,
  setSelectedDisabilityTypes,
  initialData
}: DisabilitySectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Penyandang Disabilitas</legend>
      
      <div className="flex items-center mt-2 mb-4">
        <input 
          type="checkbox" 
          name="isPersonWithDisability" 
          id="isPersonWithDisability" 
          className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500" 
          checked={isPersonWithDisability}
          onChange={(e) => setIsPersonWithDisability(e.target.checked)}
        />
        <label htmlFor="isPersonWithDisability" className="ml-2 block text-sm text-slate-900">Apakah Anda Penyandang Disabilitas?</label>
      </div>
      
      <div className={`mb-4 ${!isPersonWithDisability ? 'opacity-50' : ''}`}>
        <label className={commonLabelStyle}>Jenis Disabilitas (Bisa pilih lebih dari satu)</label>
        <select 
          className={commonInputStyle}
          disabled={!isPersonWithDisability}
          onChange={(e) => {
            if (e.target.value && !selectedDisabilityTypes.includes(e.target.value as DisabilityType)) {
              setSelectedDisabilityTypes([...selectedDisabilityTypes, e.target.value as DisabilityType]);
            }
            e.target.value = '';
          }}
        >
          <option value="">Pilih jenis disabilitas...</option>
          {Object.values(DisabilityType).map((type) => (
            <option key={type} value={type} disabled={selectedDisabilityTypes.includes(type)}>
              {type.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        {selectedDisabilityTypes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedDisabilityTypes.map((type) => (
              <span 
                key={type}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-800"
              >
                {type.replace(/_/g, ' ')}
                <button
                  type="button"
                  onClick={() => setSelectedDisabilityTypes(selectedDisabilityTypes.filter(t => t !== type))}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className={`mb-4 ${!isPersonWithDisability ? 'opacity-50' : ''}`}>
        <label htmlFor="disabilityNotes" className={commonLabelStyle}>Catatan Tambahan Terkait Disabilitas</label>
        <textarea 
          name="disabilityNotes" 
          id="disabilityNotes" 
          rows={3} 
          className={commonInputStyle} 
          disabled={!isPersonWithDisability}
          placeholder="Jelaskan lebih lanjut jika perlu"
          defaultValue={initialData?.disabilityNotes || ''}
        />
      </div>
    </fieldset>
  );
}

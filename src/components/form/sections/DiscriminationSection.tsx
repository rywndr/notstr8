'use client';

import { DiscriminationType, DiscriminationPerpetrator } from '../../../../prisma/app/generated/prisma';

interface DiscriminationSectionProps {
  discriminationExperience: string;
  onDiscriminationExperienceChange: (value: string) => void;
  selectedDiscriminationTypes: DiscriminationType[];
  onDiscriminationTypesChange: (types: DiscriminationType[]) => void;
  selectedDiscriminationPerpetrators: DiscriminationPerpetrator[];
  onDiscriminationPerpetratorsChange: (perpetrators: DiscriminationPerpetrator[]) => void;
  hasDiscrimination: boolean;
  commonInputStyle: string;
  commonLabelStyle: string;
  initialData?: {
    discriminationLocation?: string;
    wasDiscriminationReported?: boolean;
    discriminationPerpetratorOther?: string;
  };
}

export function DiscriminationSection({
  discriminationExperience,
  onDiscriminationExperienceChange,
  selectedDiscriminationTypes,
  onDiscriminationTypesChange,
  selectedDiscriminationPerpetrators,
  onDiscriminationPerpetratorsChange,
  hasDiscrimination,
  commonInputStyle,
  commonLabelStyle,
  initialData
}: DiscriminationSectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Pengalaman Diskriminasi/Kekerasan</legend>
      <div className="mb-4">
        <label htmlFor="discriminationExperience" className={commonLabelStyle}>Pernah Mengalami Diskriminasi atau Kekerasan?</label>
        <select 
          name="discriminationExperience" 
          id="discriminationExperience" 
          className={commonInputStyle}
          onChange={(e) => onDiscriminationExperienceChange(e.target.value)}
          value={discriminationExperience}
        >
          <option value="">Pilih Pengalaman</option>
          <option value="TIDAK_PERNAH">Tidak Pernah</option>
          <option value="PERNAH_MENGALAMI">Pernah Mengalami</option>
        </select>
      </div>
      <div className={`mb-4 ${discriminationExperience !== "PERNAH_MENGALAMI" ? 'opacity-50' : ''}`}>
        <label className={commonLabelStyle}>Jenis Diskriminasi/Kekerasan (Bisa pilih lebih dari satu)</label>
        <select 
          className={commonInputStyle}
          disabled={discriminationExperience !== "PERNAH_MENGALAMI"}
          onChange={(e) => {
            if (e.target.value && !selectedDiscriminationTypes.includes(e.target.value as DiscriminationType)) {
              onDiscriminationTypesChange([...selectedDiscriminationTypes, e.target.value as DiscriminationType]);
            }
            e.target.value = '';
          }}
        >
          <option value="">Pilih jenis diskriminasi...</option>
          {Object.values(DiscriminationType).map((type) => (
            <option key={type} value={type} disabled={selectedDiscriminationTypes.includes(type)}>
              {type.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        {selectedDiscriminationTypes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedDiscriminationTypes.map((type) => (
              <span 
                key={type}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-800"
              >
                {type.replace(/_/g, ' ')}
                <button
                  type="button"
                  onClick={() => onDiscriminationTypesChange(selectedDiscriminationTypes.filter(t => t !== type))}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={`mb-4 ${discriminationExperience !== "PERNAH_MENGALAMI" ? 'opacity-50' : ''}`}>
        <label className={commonLabelStyle}>Pelaku Diskriminasi/Kekerasan (Bisa pilih lebih dari satu)</label>
        <select 
          className={commonInputStyle}
          disabled={discriminationExperience !== "PERNAH_MENGALAMI"}
          onChange={(e) => {
            if (e.target.value && !selectedDiscriminationPerpetrators.includes(e.target.value as DiscriminationPerpetrator)) {
              onDiscriminationPerpetratorsChange([...selectedDiscriminationPerpetrators, e.target.value as DiscriminationPerpetrator]);
            }
            e.target.value = '';
          }}
        >
          <option value="">Pilih pelaku diskriminasi...</option>
          {Object.values(DiscriminationPerpetrator).map((type) => (
            <option key={type} value={type} disabled={selectedDiscriminationPerpetrators.includes(type)}>
              {type.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        {selectedDiscriminationPerpetrators.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedDiscriminationPerpetrators.map((type) => (
              <span 
                key={type}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-800"
              >
                {type.replace(/_/g, ' ')}
                <button
                  type="button"
                  onClick={() => onDiscriminationPerpetratorsChange(selectedDiscriminationPerpetrators.filter(t => t !== type))}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {selectedDiscriminationPerpetrators.includes(DiscriminationPerpetrator.OTHER) && (
          <div className="mt-2">
            <label htmlFor="discriminationPerpetratorOther" className={commonLabelStyle}>Pelaku Lainnya</label>
            <input
              type="text"
              name="discriminationPerpetratorOther"
              id="discriminationPerpetratorOther"
              className={commonInputStyle}
              disabled={discriminationExperience !== "PERNAH_MENGALAMI"}
              placeholder="Sebutkan pelaku lainnya"
              defaultValue={initialData?.discriminationPerpetratorOther || ''}
            />
          </div>
        )}
      </div>
      <div className={`mb-4 ${discriminationExperience !== "PERNAH_MENGALAMI" ? 'opacity-50' : ''}`}>
        <label htmlFor="discriminationLocation" className={commonLabelStyle}>Lokasi Kejadian</label>
        <input 
          type="text" 
          name="discriminationLocation" 
          id="discriminationLocation" 
          className={commonInputStyle} 
          disabled={!hasDiscrimination}
          placeholder="Contoh: Kantor, sekolah, tempat umum"
          defaultValue={initialData?.discriminationLocation || ''}
        />
      </div>
      <div className={`flex items-center mt-2 mb-4 ${!hasDiscrimination ? 'opacity-50' : ''}`}>
        <input 
          type="checkbox" 
          name="wasDiscriminationReported" 
          id="wasDiscriminationReported" 
          className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500" 
          disabled={!hasDiscrimination}
          defaultChecked={initialData?.wasDiscriminationReported || false}
        />
        <label htmlFor="wasDiscriminationReported" className="ml-2 block text-sm text-slate-900">Apakah Diskriminasi/Kekerasan Telah Dilaporkan?</label>
      </div>
    </fieldset>
  );
}

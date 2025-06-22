'use client';

interface SocialAssistanceSectionProps {
  otherSocialAssistance: string[];
  onOtherSocialAssistanceChange: (index: number, value: string) => void;
  onAddOtherSocialAssistanceField: () => void;
  onRemoveOtherSocialAssistanceField: (index: number) => void;
  commonInputStyle: string;
  commonLabelStyle: string;
  initialData?: {
    receivesSocialAssistance?: boolean;
    isRegisteredInDTKS?: boolean;
    communityGroup?: string;
  };
}

export function SocialAssistanceSection({
  otherSocialAssistance,
  onOtherSocialAssistanceChange,
  onAddOtherSocialAssistanceField,
  onRemoveOtherSocialAssistanceField,
  commonInputStyle,
  commonLabelStyle,
  initialData
}: SocialAssistanceSectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Bantuan Sosial & Komunitas</legend>
      <div className="flex items-center mt-2 mb-4">
        <input type="checkbox" name="receivesSocialAssistance" id="receivesSocialAssistance" className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500" defaultChecked={initialData?.receivesSocialAssistance || false} />
        <label htmlFor="receivesSocialAssistance" className="ml-2 block text-sm text-slate-900">Mendapatkan Bantuan Sosial dari Pemerintah?</label>
      </div>
      <div className="flex items-center mt-2 mb-4">
        <input type="checkbox" name="isRegisteredInDTKS" id="isRegisteredInDTKS" className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500" defaultChecked={initialData?.isRegisteredInDTKS || false} />
        <label htmlFor="isRegisteredInDTKS" className="ml-2 block text-sm text-slate-900">Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS)?</label>
      </div>
      <div className="mb-4">
        <label className={commonLabelStyle}>Bantuan Sosial Lainnya yang Diterima (jika ada)</label>
        {otherSocialAssistance.map((assistance, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={assistance}
              onChange={(e) => onOtherSocialAssistanceChange(index, e.target.value)}
              className={commonInputStyle + " flex-grow"}
              placeholder={`Bantuan Lainnya ${index + 1}`}
            />
            {index > 0 && (
              <button 
                type="button" 
                onClick={() => onRemoveOtherSocialAssistanceField(index)}
                className="px-3 py-2 bg-slate-500 text-white rounded-md text-sm hover:bg-slate-600 transition-colors"
              >
                Hapus
              </button>
            )}
          </div>
        ))}
        <button 
          type="button" 
          onClick={onAddOtherSocialAssistanceField}
          className="mt-2 px-3 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-700 transition-colors"
        >
          + Tambah Bantuan Lain
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="communityGroup" className={commonLabelStyle}>Kelompok Komunitas yang Diikuti</label>
        <input type="text" name="communityGroup" id="communityGroup" className={commonInputStyle} defaultValue={initialData?.communityGroup || ''} />
      </div>
    </fieldset>
  );
}

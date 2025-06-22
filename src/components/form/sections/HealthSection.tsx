'use client';

interface HealthSectionProps {
  commonInputStyle: string;
  commonLabelStyle: string;
  initialData?: {
    healthServiceAccess?: string;
    chronicIllness?: string;
  };
}

export function HealthSection({
  commonInputStyle,
  commonLabelStyle,
  initialData
}: HealthSectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Data Kesehatan</legend>
      <div className="mb-4">
        <label htmlFor="healthServiceAccess" className={commonLabelStyle}>Akses Layanan Kesehatan Terakhir/Rutin</label>
        <select name="healthServiceAccess" id="healthServiceAccess" className={commonInputStyle} defaultValue={initialData?.healthServiceAccess || ''}>
          <option value="">Pilih Layanan</option>
          <option value="PUSKESMAS">Puskesmas</option>
          <option value="RUMAH_SAKIT">Rumah Sakit</option>
          <option value="KLINIK">Klinik</option>
          <option value="TIDAK_PERNAH">Tidak Pernah</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="chronicIllness" className={commonLabelStyle}>Penyakit Kronis atau Kondisi Kesehatan Khusus</label>
        <input type="text" name="chronicIllness" id="chronicIllness" className={commonInputStyle} defaultValue={initialData?.chronicIllness || ''} />
      </div>
    </fieldset>
  );
}

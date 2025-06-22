'use client';

interface AddressSectionProps {
  commonInputStyle: string;
  commonLabelStyle: string;
  initialData?: {
    address?: string;
    domicileKelurahan?: string;
    domicileKecamatan?: string;
    domicileRegencyCity?: string;
    city?: string;
    residencyStatus?: string;
    livingSituation?: string;
  };
}

export function AddressSection({ commonInputStyle, commonLabelStyle, initialData }: AddressSectionProps) {
  return (
    <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-slate-50">
      <legend className="text-lg font-semibold text-slate-700 px-2">Alamat Domisili</legend>
      
      <div className="mb-4">
        <label htmlFor="address" className={commonLabelStyle}>Alamat Lengkap (Jalan, Nomor, RT/RW)</label>
        <textarea name="address" id="address" rows={3} className={commonInputStyle} placeholder="Contoh: Jl. Kuantan No. 123, RT 001/RW 002" defaultValue={initialData?.address || ''}></textarea>
      </div>
      
      <div className="mb-4">
        <label htmlFor="domicileKelurahan" className={commonLabelStyle}>Kelurahan Domisili</label>
        <input type="text" name="domicileKelurahan" id="domicileKelurahan" className={commonInputStyle} placeholder="Contoh: Bukit Cermin" defaultValue={initialData?.domicileKelurahan || ''} />
      </div>
      
      <div className="mb-4">
        <label htmlFor="domicileKecamatan" className={commonLabelStyle}>Kecamatan Domisili</label>
        <input type="text" name="domicileKecamatan" id="domicileKecamatan" className={commonInputStyle} placeholder="Contoh: Bukit Bestari" defaultValue={initialData?.domicileKecamatan || ''} />
      </div>
      
      <div className="mb-4">
        <label htmlFor="domicileRegencyCity" className={commonLabelStyle}>Kabupaten/Kota Domisili</label>
        <input type="text" name="domicileRegencyCity" id="domicileRegencyCity" className={commonInputStyle} placeholder="Contoh: Kepulauan Riau/Kota Tanjungpinang" defaultValue={initialData?.domicileRegencyCity || ''} />
      </div>
      
      <div className="mb-4">
        <label htmlFor="city" className={commonLabelStyle}>Kota (Wajib, bisa sama dengan Kab/Kota Domisili)</label>
        <input type="text" name="city" id="city" required className={commonInputStyle} placeholder="Contoh: Tanjungpinang" defaultValue={initialData?.city || ''} />
      </div>
      
      <div className="mb-4">
        <label htmlFor="residencyStatus" className={commonLabelStyle}>Status Kependudukan</label>
        <select name="residencyStatus" id="residencyStatus" className={commonInputStyle} defaultValue={initialData?.residencyStatus || ''}>
          <option value="">Pilih Status Kependudukan</option>
          <option value="PENDATANG">Pendatang</option>
          <option value="PENDUDUK_TETAP">Penduduk Tetap</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="livingSituation" className={commonLabelStyle}>Status Tempat Tinggal</label>
        <select name="livingSituation" id="livingSituation" className={commonInputStyle} defaultValue={initialData?.livingSituation || ''}>
          <option value="">Pilih Status Tempat Tinggal</option>
          <option value="BERSAMA_ORANG_TUA">Bersama Orang Tua</option>
          <option value="RUMAH_PRIBADI">Rumah Pribadi</option>
          <option value="SEWA_KONTRAK">Sewa/Kontrak</option>
        </select>
      </div>
    </fieldset>
  );
}

'use client';

import { useRef, useState, FormEvent } from 'react';
import { addCommunityMember } from '@/app/actions';

export default function CommunityForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    const result = await addCommunityMember(formData);

    if (result?.error) {
      setMessage(`Error: ${result.error}`);
    } else if (result?.success) {
      setMessage(result.success);
      formRef.current?.reset(); // Reset form on success
    } else {
      setMessage('Terjadi kesalahan yang tidak diketahui.');
    }
    setIsLoading(false);
  }

  const commonInputStyle = "mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const commonLabelStyle = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Formulir Data Komunitas</h2>

      {message && <p className={`p-3 rounded-md ${message.startsWith('Error:') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>}

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Data Pribadi</legend>

        <div className="mb-4">
          <label htmlFor="firstName" className={commonLabelStyle}>Nama Depan (Wajib)</label>
          <input type="text" name="firstName" id="firstName" required className={commonInputStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="middleName" className={commonLabelStyle}>Nama Tengah</label>
          <input type="text" name="middleName" id="middleName" className={commonInputStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className={commonLabelStyle}>Nama Belakang</label>
          <input type="text" name="lastName" id="lastName" className={commonInputStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="communityNickname" className={commonLabelStyle}>Nama Alias/Panggilan Komunitas</label>
          <input type="text" name="communityNickname" id="communityNickname" className={commonInputStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="placeOfBirth" className={commonLabelStyle}>Tempat Lahir</label>
          <input type="text" name="placeOfBirth" id="placeOfBirth" className={commonInputStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfBirth" className={commonLabelStyle}>Tanggal Lahir</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" className={commonInputStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className={commonLabelStyle}>Usia</label>
          <input type="number" name="age" id="age" className={commonInputStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className={commonLabelStyle}>Jenis Kelamin</label>
          <select name="gender" id="gender" className={commonInputStyle}>
            <option value="">Pilih Jenis Kelamin</option>
            <option value="PRIA">Pria</option>
            <option value="WANITA">Wanita</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="genderIdentity" className={commonLabelStyle}>Identitas Gender</label>
          <select name="genderIdentity" id="genderIdentity" className={commonInputStyle}>
            <option value="">Pilih Identitas Gender</option>
            <option value="NONE">None</option>
            <option value="WARIA">Waria</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Data Kependudukan</legend>
        <div className="mb-4">
          <label htmlFor="nik" className={commonLabelStyle}>NIK (Nomor Induk Kependudukan)</label>
          <input type="text" name="nik" id="nik" className={commonInputStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="idScanUrl" className={commonLabelStyle}>Pindaian KTP (Gambar)</label>
          <input type="file" name="idScanUrl" id="idScanUrl" accept="image/*" className={`${commonInputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100`} />
        </div>

        <div className="mb-4">
          <label htmlFor="familyCardNumber" className={commonLabelStyle}>Nomor Kartu Keluarga (KK)</label>
          <input type="text" name="familyCardNumber" id="familyCardNumber" className={commonInputStyle} />
        </div>

        <div className="mb-4">
          <label htmlFor="ektpStatus" className={commonLabelStyle}>Status Kepemilikan E-KTP</label>
          <select name="ektpStatus" id="ektpStatus" className={commonInputStyle}>
            <option value="">Pilih Status E-KTP</option>
            <option value="MEMILIKI">Memiliki</option>
            <option value="TIDAK_MEMILIKI">Tidak Memiliki</option>
            <option value="DALAM_PROSES">Dalam Proses</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Alamat Domisili</legend>
        <div className="mb-4">
          <label htmlFor="address" className={commonLabelStyle}>Alamat Lengkap (Jalan, Nomor, RT/RW)</label>
          <textarea name="address" id="address" rows={3} className={commonInputStyle}></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="domicileKelurahan" className={commonLabelStyle}>Kelurahan Domisili</label>
          <input type="text" name="domicileKelurahan" id="domicileKelurahan" className={commonInputStyle} />
        </div>
        <div className="mb-4">
          <label htmlFor="domicileKecamatan" className={commonLabelStyle}>Kecamatan Domisili</label>
          <input type="text" name="domicileKecamatan" id="domicileKecamatan" className={commonInputStyle} />
        </div>
        <div className="mb-4">
          <label htmlFor="domicileRegencyCity" className={commonLabelStyle}>Kabupaten/Kota Domisili</label>
          <input type="text" name="domicileRegencyCity" id="domicileRegencyCity" className={commonInputStyle} />
        </div>
         <div className="mb-4">
          <label htmlFor="city" className={commonLabelStyle}>Kota (Wajib, bisa sama dengan Kab/Kota Domisili)</label>
          <input type="text" name="city" id="city" required className={commonInputStyle} />
        </div>
        <div className="mb-4">
          <label htmlFor="residencyStatus" className={commonLabelStyle}>Status Kependudukan</label>
          <select name="residencyStatus" id="residencyStatus" className={commonInputStyle}>
            <option value="">Pilih Status Kependudukan</option>
            <option value="PENDATANG">Pendatang</option>
            <option value="PENDUDUK_TETAP">Penduduk Tetap</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="livingSituation" className={commonLabelStyle}>Status Tempat Tinggal</label>
          <select name="livingSituation" id="livingSituation" className={commonInputStyle}>
            <option value="">Pilih Status Tempat Tinggal</option>
            <option value="BERSAMA_ORANG_TUA">Bersama Orang Tua</option>
            <option value="RUMAH_PRIBADI">Rumah Pribadi</option>
            <option value="SEWA_KONTRAK">Sewa/Kontrak</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Kontak</legend>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className={commonLabelStyle}>Nomor Telepon Pribadi</label>
          <input type="tel" name="phoneNumber" id="phoneNumber" className={commonInputStyle} />
        </div>
        <div className="mb-4">
          <label htmlFor="serviceContactPerson" className={commonLabelStyle}>Kontak Layanan (Jika ada)</label>
          <input type="text" name="serviceContactPerson" id="serviceContactPerson" className={commonInputStyle} />
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Status Sosial & Ekonomi</legend>
        <div className="mb-4">
          <label htmlFor="maritalStatus" className={commonLabelStyle}>Status Perkawinan</label>
          <input type="text" name="maritalStatus" id="maritalStatus" className={commonInputStyle} placeholder="Contoh: Belum Kawin, Kawin, Cerai" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastEducation" className={commonLabelStyle}>Pendidikan Terakhir</label>
          <select name="lastEducation" id="lastEducation" className={commonInputStyle}>
            <option value="">Pilih Pendidikan</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA_SMK">SMA/SMK</option>
            <option value="PERGURUAN_TINGGI">Perguruan Tinggi</option>
            <option value="TIDAK_SEKOLAH">Tidak Sekolah</option>
          </select>
        </div>
        <div className="flex items-center mt-2 mb-4">
          <input type="checkbox" name="isStillStudying" id="isStillStudying" className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
          <label htmlFor="isStillStudying" className="ml-2 block text-sm text-slate-900">Masih Sekolah/Kuliah?</label>
        </div>
        <div className="mb-4">
          <label htmlFor="employmentStatus" className={commonLabelStyle}>Status Pekerjaan</label>
          <input type="text" name="employmentStatus" id="employmentStatus" className={commonInputStyle} placeholder="Contoh: Bekerja, Tidak Bekerja, Pelajar" />
        </div>
        <div className="mb-4">
          <label htmlFor="monthlyIncome" className={commonLabelStyle}>Pendapatan Bulanan</label>
          <input type="text" name="monthlyIncome" id="monthlyIncome" className={commonInputStyle} placeholder="Contoh: 1.000.000 atau Rentang 1jt-2jt" />
        </div>
        <div className="flex items-center mt-2 mb-4">
          <input type="checkbox" name="hasOwnBusiness" id="hasOwnBusiness" className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
          <label htmlFor="hasOwnBusiness" className="ml-2 block text-sm text-slate-900">Memiliki Usaha Sendiri?</label>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Pelatihan</legend>
        <div className="flex items-center mt-2 mb-4">
          <input type="checkbox" name="hasReceivedSkillTraining" id="hasReceivedSkillTraining" className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
          <label htmlFor="hasReceivedSkillTraining" className="ml-2 block text-sm text-slate-900">Pernah Menerima Pelatihan Keterampilan Usaha?</label>
        </div>
        <div className="mb-4">
          <label htmlFor="skillTrainingType" className={commonLabelStyle}>Jenis Pelatihan yang Pernah Diikuti</label>
          <input type="text" name="skillTrainingType" id="skillTrainingType" className={commonInputStyle} />
        </div>
        <div className="mb-4">
          <label htmlFor="desiredSkillTraining" className={commonLabelStyle}>Pelatihan yang Diinginkan</label>
          <input type="text" name="desiredSkillTraining" id="desiredSkillTraining" className={commonInputStyle} />
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Informasi BPJS</legend>
        <div className="flex items-center mb-4">
          <input type="checkbox" name="hasBpjs" id="hasBpjs" className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
          <label htmlFor="hasBpjs" className="ml-2 block text-sm text-slate-900">Apakah memiliki BPJS?</label>
        </div>
        <div className="mb-4">
          <label htmlFor="bpjsId" className={commonLabelStyle}>Nomor BPJS</label>
          <input type="text" name="bpjsId" id="bpjsId" className={commonInputStyle} />
        </div>
        <div className="mb-4">
          <label htmlFor="bpjsScanUrl" className={commonLabelStyle}>Pindaian Kartu BPJS (Gambar)</label>
          <input type="file" name="bpjsScanUrl" id="bpjsScanUrl" accept="image/*" className={`${commonInputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100`} />
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Data Kesehatan</legend>
        <div className="mb-4">
          <label htmlFor="healthServiceAccess" className={commonLabelStyle}>Akses Layanan Kesehatan Terakhir/Rutin</label>
          <select name="healthServiceAccess" id="healthServiceAccess" className={commonInputStyle}>
            <option value="">Pilih Layanan</option>
            <option value="PUSKESMAS">Puskesmas</option>
            <option value="RUMAH_SAKIT">Rumah Sakit</option>
            <option value="KLINIK">Klinik</option>
            <option value="TIDAK_PERNAH">Tidak Pernah</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="chronicIllness" className={commonLabelStyle}>Penyakit Kronis atau Kondisi Kesehatan Khusus</label>
          <input type="text" name="chronicIllness" id="chronicIllness" className={commonInputStyle} />
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Pengalaman Diskriminasi/Kekerasan</legend>
        <div className="mb-4">
          <label htmlFor="discriminationExperience" className={commonLabelStyle}>Pernah Mengalami Diskriminasi atau Kekerasan?</label>
          <select name="discriminationExperience" id="discriminationExperience" className={commonInputStyle}>
            <option value="">Pilih Pengalaman</option>
            <option value="TIDAK_PERNAH">Tidak Pernah</option>
            <option value="PERNAH_MENGALAMI">Pernah Mengalami</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="discriminationType" className={commonLabelStyle}>Jenis Diskriminasi/Kekerasan (Jika ada)</label>
          <input type="text" name="discriminationType" id="discriminationType" className={commonInputStyle} />
        </div>
        <div className="mb-4">
          <label htmlFor="discriminationPerpetrator" className={commonLabelStyle}>Pelaku Diskriminasi/Kekerasan (Jika ada)</label>
          <input type="text" name="discriminationPerpetrator" id="discriminationPerpetrator" className={commonInputStyle} />
        </div>
        <div className="mb-4">
          <label htmlFor="discriminationLocation" className={commonLabelStyle}>Lokasi Kejadian (Jika ada)</label>
          <input type="text" name="discriminationLocation" id="discriminationLocation" className={commonInputStyle} />
        </div>
        <div className="flex items-center mt-2 mb-4">
          <input type="checkbox" name="wasDiscriminationReported" id="wasDiscriminationReported" className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
          <label htmlFor="wasDiscriminationReported" className="ml-2 block text-sm text-slate-900">Apakah Diskriminasi/Kekerasan Telah Dilaporkan?</label>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Bantuan Sosial & Komunitas</legend>
        <div className="flex items-center mt-2 mb-4">
          <input type="checkbox" name="receivesSocialAssistance" id="receivesSocialAssistance" className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
          <label htmlFor="receivesSocialAssistance" className="ml-2 block text-sm text-slate-900">Mendapatkan Bantuan Sosial dari Pemerintah?</label>
        </div>
        <div className="flex items-center mt-2 mb-4">
          <input type="checkbox" name="isRegisteredInDTKS" id="isRegisteredInDTKS" className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
          <label htmlFor="isRegisteredInDTKS" className="ml-2 block text-sm text-slate-900">Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS)?</label>
        </div>
        <div className="mb-4">
          <label htmlFor="communityGroup" className={commonLabelStyle}>Kelompok Komunitas yang Diikuti</label>
          <input type="text" name="communityGroup" id="communityGroup" className={commonInputStyle} />
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Catatan Tambahan</legend>
        <div className="mb-4">
          <label htmlFor="notes" className={commonLabelStyle}>Catatan Tambahan</label>
          <textarea name="notes" id="notes" rows={3} className={commonInputStyle}></textarea>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {isLoading ? 'Mengirim...' : 'Kirim Data'}
      </button>
    </form>
  );
}
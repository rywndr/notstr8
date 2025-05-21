'use client';

import { useRef, useState, FormEvent } from 'react';
import { addCommunityMember } from '@/actions';
import { 
  handleDigitInput, 
  handlePhoneInput, 
  handleRupiahInput,
  handleDateOfBirthChange,
  handleAgeChange
} from '@/utils/formHandlers';

export default function CommunityForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasBpjs, setHasBpjs] = useState(false);
  const [hasDiscrimination, setHasDiscrimination] = useState(false);
  const [discriminationExperience, setDiscriminationExperience] = useState("");
  const [hasReceivedTraining, setHasReceivedTraining] = useState(false);
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [hasEktp, setHasEktp] = useState(false);
  const [hasOwnBusiness, setHasOwnBusiness] = useState(false);
  const [isStillStudying, setIsStillStudying] = useState(false);
  const [educationLevel, setEducationLevel] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [age, setAge] = useState<string>("");

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
      
      // Reset all state variables
      setHasBpjs(false);
      setHasDiscrimination(false);
      setDiscriminationExperience("");
      setHasReceivedTraining(false);
      setEmploymentStatus("");
      setHasEktp(false);
      setHasOwnBusiness(false);
      setIsStillStudying(false);
      setEducationLevel("");
      setDateOfBirth("");
      setAge("");
    } else {
      setMessage('Terjadi kesalahan yang tidak diketahui.');
    }
    setIsLoading(false);
  }

  const commonInputStyle = "mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const commonLabelStyle = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-slate-50 py-8 rounded-lg shadow-md w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <input 
            type="text" 
            name="nik" 
            id="nik" 
            className={commonInputStyle} 
            placeholder="Contoh: 1234567890123456" 
            maxLength={16} 
            onInput={handleDigitInput}
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
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ektpStatus" className={commonLabelStyle}>Status Kepemilikan E-KTP</label>
          <select 
            name="ektpStatus" 
            id="ektpStatus" 
            className={commonInputStyle}
            onChange={(e) => setHasEktp(e.target.value === "MEMILIKI")}
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
            className={`${commonInputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100`}
            disabled={!hasEktp}
          />
        </div>

      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Alamat Domisili</legend>
        <div className="mb-4">
          <label htmlFor="address" className={commonLabelStyle}>Alamat Lengkap (Jalan, Nomor, RT/RW)</label>
          <textarea name="address" id="address" rows={3} className={commonInputStyle} placeholder="Contoh: Jl. Kuantan No. 123, RT 001/RW 002"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="domicileKelurahan" className={commonLabelStyle}>Kelurahan Domisili</label>
          <input type="text" name="domicileKelurahan" id="domicileKelurahan" className={commonInputStyle} placeholder="Contoh: Bukit Cermin" />
        </div>
        <div className="mb-4">
          <label htmlFor="domicileKecamatan" className={commonLabelStyle}>Kecamatan Domisili</label>
          <input type="text" name="domicileKecamatan" id="domicileKecamatan" className={commonInputStyle} placeholder="Contoh: Bukit Bestari" />
        </div>
        <div className="mb-4">
          <label htmlFor="domicileRegencyCity" className={commonLabelStyle}>Kabupaten/Kota Domisili</label>
          <input type="text" name="domicileRegencyCity" id="domicileRegencyCity" className={commonInputStyle} placeholder="Contoh: Kepulauan Riau/Kota Tanjungpinang" />
        </div>
         <div className="mb-4">
          <label htmlFor="city" className={commonLabelStyle}>Kota (Wajib, bisa sama dengan Kab/Kota Domisili)</label>
          <input type="text" name="city" id="city" required className={commonInputStyle} placeholder="Contoh: Tanjungpinang" />
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
              onInput={handlePhoneInput}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Format: +62 8xxx-xxxx-xxx (hanya masukkan angka setelah +62, harus diawali dengan 8)
          </p>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Status Sosial & Ekonomi</legend>
        <div className="mb-4">
          <label htmlFor="maritalStatus" className={commonLabelStyle}>Status Perkawinan</label>
          <select name="maritalStatus" id="maritalStatus" className={commonInputStyle}>
            <option value="">Pilih Status Perkawinan</option>
            <option value="BELUM_KAWIN">Belum Kawin</option>
            <option value="KAWIN">Kawin</option>
            <option value="CERAI">Cerai</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="lastEducation" className={commonLabelStyle}>Pendidikan Terakhir</label>
          <select 
            name="lastEducation" 
            id="lastEducation" 
            className={commonInputStyle}
            value={educationLevel}
            onChange={(e) => {
              setEducationLevel(e.target.value);
              if (e.target.value === "TIDAK_SEKOLAH") {
                setIsStillStudying(false); // Uncheck "Masih Sekolah/Kuliah" when "Tidak Sekolah" is selected
              }
            }}
          >
            <option value="">Pilih Pendidikan</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA_SMK">SMA/SMK</option>
            <option value="PERGURUAN_TINGGI">Perguruan Tinggi</option>
            <option value="TIDAK_SEKOLAH">Tidak Sekolah</option>
          </select>
        </div>
        <div className={`flex items-center mt-2 mb-4 ${educationLevel === "TIDAK_SEKOLAH" ? 'opacity-50' : ''}`}>
          <input 
            type="checkbox" 
            name="isStillStudying" 
            id="isStillStudying" 
            className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
            checked={isStillStudying}
            onChange={(e) => setIsStillStudying(e.target.checked)}
            disabled={educationLevel === "TIDAK_SEKOLAH"}
          />
          <label htmlFor="isStillStudying" className="ml-2 block text-sm text-slate-900">Masih Sekolah/Kuliah?</label>
        </div>
        <div className="mb-4">
          <label htmlFor="employmentStatus" className={commonLabelStyle}>Status Pekerjaan</label>
          <select 
            name="employmentStatus" 
            id="employmentStatus" 
            className={commonInputStyle}
            onChange={(e) => setEmploymentStatus(e.target.value)}
            value={employmentStatus}
          >
            <option value="">Pilih Status Pekerjaan</option>
            <option value="BEKERJA">Bekerja</option>
            <option value="TIDAK_BEKERJA">Tidak Bekerja</option>
            <option value="PELAJAR">Pelajar</option>
            <option value="MAHASISWA">Mahasiswa</option>
          </select>
        </div>
        <div className={`mb-4 ${employmentStatus !== "BEKERJA" ? 'opacity-50' : ''}`}>
          <label htmlFor="jobDescription" className={commonLabelStyle}>Jenis Pekerjaan</label>
          <input 
            type="text" 
            name="jobDescription" 
            id="jobDescription" 
            className={commonInputStyle} 
            placeholder="Contoh: Karyawan Swasta, Wirausaha, PNS"
            disabled={employmentStatus !== "BEKERJA"}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="monthlyIncome" className={commonLabelStyle}>Pendapatan Bulanan</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
              Rp
            </span>
            <input 
              type="text" 
              name="monthlyIncome" 
              id="monthlyIncome" 
              className={`${commonInputStyle} pl-10`} 
              placeholder="1.000.000" 
              onInput={handleRupiahInput}
            />
          </div>
        </div>
        <div className="flex items-center mt-2 mb-4">
          <input 
            type="checkbox" 
            name="hasOwnBusiness" 
            id="hasOwnBusiness" 
            className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" 
            onChange={(e) => setHasOwnBusiness(e.target.checked)}
            checked={hasOwnBusiness}
          />
          <label htmlFor="hasOwnBusiness" className="ml-2 block text-sm text-slate-900">Memiliki Usaha Sendiri?</label>
        </div>
        <div className={`mb-4 ${!hasOwnBusiness ? 'opacity-50' : ''}`}>
          <label htmlFor="businessDetails" className={commonLabelStyle}>Detail Usaha</label>
          <input 
            type="text" 
            name="businessDetails" 
            id="businessDetails" 
            className={commonInputStyle} 
            placeholder="Contoh: Warung Makan, Toko Online, Jasa Jahit"
            disabled={!hasOwnBusiness}
          />
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Pelatihan</legend>
        <div className="flex items-center mt-2 mb-4">
          <input 
            type="checkbox" 
            name="hasReceivedSkillTraining" 
            id="hasReceivedSkillTraining" 
            className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" 
            onChange={(e) => setHasReceivedTraining(e.target.checked)}
            checked={hasReceivedTraining}
          />
          <label htmlFor="hasReceivedSkillTraining" className="ml-2 block text-sm text-slate-900">Pernah Menerima Pelatihan Keterampilan Usaha?</label>
        </div>
        <div className={`mb-4 ${!hasReceivedTraining ? 'opacity-50' : ''}`}>
          <label htmlFor="skillTrainingType" className={commonLabelStyle}>Jenis Pelatihan yang Pernah Diikuti</label>
          <input 
            type="text" 
            name="skillTrainingType" 
            id="skillTrainingType" 
            className={commonInputStyle} 
            disabled={!hasReceivedTraining}
            placeholder="Contoh: Pelatihan Digital Marketing"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desiredSkillTraining" className={commonLabelStyle}>Pelatihan yang Diinginkan</label>
          <input type="text" name="desiredSkillTraining" id="desiredSkillTraining" className={commonInputStyle} placeholder="Contoh: Pelatihan Kewirausahaan" />
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-6 rounded-md shadow-sm bg-white">
        <legend className="text-lg font-semibold text-slate-700 px-2">Informasi BPJS</legend>
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            name="hasBpjs" 
            id="hasBpjs" 
            className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" 
            onChange={(e) => setHasBpjs(e.target.checked)}
            checked={hasBpjs}
          />
          <label htmlFor="hasBpjs" className="ml-2 block text-sm text-slate-900">Apakah memiliki BPJS?</label>
        </div>
        <div className={`mb-4 ${!hasBpjs ? 'opacity-50' : ''}`}>
          <label htmlFor="bpjsId" className={commonLabelStyle}>Nomor BPJS</label>
          <input 
            type="text" 
            name="bpjsId" 
            id="bpjsId" 
            className={commonInputStyle} 
            disabled={!hasBpjs} 
            placeholder="Contoh: 0001234567890"
            onInput={handleDigitInput}
          />
        </div>
        <div className={`mb-4 ${!hasBpjs ? 'opacity-50' : ''}`}>
          <label htmlFor="bpjsScanUrl" className={commonLabelStyle}>Pindaian Kartu BPJS (Gambar)</label>
          <input 
            type="file" 
            name="bpjsScanUrl" 
            id="bpjsScanUrl" 
            accept="image/*" 
            className={`${commonInputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100`} 
            disabled={!hasBpjs}
          />
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
          <select 
            name="discriminationExperience" 
            id="discriminationExperience" 
            className={commonInputStyle}
            onChange={(e) => {
              setDiscriminationExperience(e.target.value);
              setHasDiscrimination(e.target.value === "PERNAH_MENGALAMI");
            }}
            value={discriminationExperience}
          >
            <option value="">Pilih Pengalaman</option>
            <option value="TIDAK_PERNAH">Tidak Pernah</option>
            <option value="PERNAH_MENGALAMI">Pernah Mengalami</option>
          </select>
        </div>
        <div className={`mb-4 ${!hasDiscrimination ? 'opacity-50' : ''}`}>
          <label htmlFor="discriminationType" className={commonLabelStyle}>Jenis Diskriminasi/Kekerasan</label>
          <input 
            type="text" 
            name="discriminationType" 
            id="discriminationType" 
            className={commonInputStyle} 
            disabled={!hasDiscrimination}
            placeholder="Contoh: Diskriminasi di tempat kerja"
          />
        </div>
        <div className={`mb-4 ${!hasDiscrimination ? 'opacity-50' : ''}`}>
          <label htmlFor="discriminationPerpetrator" className={commonLabelStyle}>Pelaku Diskriminasi/Kekerasan</label>
          <input 
            type="text" 
            name="discriminationPerpetrator" 
            id="discriminationPerpetrator" 
            className={commonInputStyle} 
            disabled={!hasDiscrimination}
            placeholder="Contoh: Atasan, rekan kerja"
          />
        </div>
        <div className={`mb-4 ${!hasDiscrimination ? 'opacity-50' : ''}`}>
          <label htmlFor="discriminationLocation" className={commonLabelStyle}>Lokasi Kejadian</label>
          <input 
            type="text" 
            name="discriminationLocation" 
            id="discriminationLocation" 
            className={commonInputStyle} 
            disabled={!hasDiscrimination}
            placeholder="Contoh: Kantor, sekolah, tempat umum"
          />
        </div>
        <div className={`flex items-center mt-2 mb-4 ${!hasDiscrimination ? 'opacity-50' : ''}`}>
          <input 
            type="checkbox" 
            name="wasDiscriminationReported" 
            id="wasDiscriminationReported" 
            className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" 
            disabled={!hasDiscrimination}
          />
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
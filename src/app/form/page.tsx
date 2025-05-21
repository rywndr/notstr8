import CommunityForm from '@/components/CommunityForm';
import { getCommunityMembers } from '@/actions';
import { CommunityMember } from '../../../prisma/app/generated/prisma';

export const dynamic = 'force-dynamic'; // Ensure data is fetched on every request

export default async function FormPage() {
  const members = await getCommunityMembers();

  const cardStyle = "bg-slate-50 shadow-lg rounded-lg p-6 mb-6 w-full max-w-2xl";
  const headingStyle = "text-xl font-semibold text-slate-700 mb-2";
  const textStyle = "text-slate-600";
  const fileLinkStyle = "text-sky-600 hover:text-sky-800 underline";

  return (
   <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Pendataan Komunitas</h1>
          <p className="text-lg text-slate-600">Silakan isi formulir di bawah ini untuk mendaftarkan data Anda.</p>
        </header>

        <CommunityForm />
        
         <section className="w-full max-w-4xl mt-12">
          <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Data Terdaftar</h2>
          {members.length === 0 ? (
            <p className="text-center text-slate-500">Belum ada data yang terdaftar.</p>
          ) : (
            <div className="space-y-6">
              {members.map((member: CommunityMember) => (
                <div key={member.id} className={cardStyle}>
                  <h3 className={headingStyle}>
                    {member.firstName} {member.middleName || ''} {member.lastName || ''}
                  </h3>
                  <p className={textStyle}><span className="font-semibold">Nama Panggilan Komunitas:</span> {member.communityNickname || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Tempat Lahir:</span> {member.placeOfBirth || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Tanggal Lahir:</span> {member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString('id-ID') : '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Usia:</span> {member.age || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Jenis Kelamin:</span> {member.gender || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Identitas Gender:</span> {member.genderIdentity || '-'}</p>
                  
                  <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-1">Data Kependudukan:</h4>
                  <p className={textStyle}><span className="font-semibold">NIK:</span> {member.nik || '-'}</p>
                  {member.idScanUrl && <p className={textStyle}><span className="font-semibold">Pindaian KTP:</span> <a href={member.idScanUrl} target="_blank" rel="noopener noreferrer" className={fileLinkStyle}>Lihat File</a></p>}
                  <p className={textStyle}><span className="font-semibold">No. KK:</span> {member.familyCardNumber || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Status E-KTP:</span> {member.ektpStatus || '-'}</p>

                  <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-1">Alamat Domisili:</h4>
                  <p className={textStyle}><span className="font-semibold">Alamat Lengkap:</span> {member.address || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Kelurahan:</span> {member.domicileKelurahan || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Kecamatan:</span> {member.domicileKecamatan || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Kabupaten/Kota:</span> {member.domicileRegencyCity || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Kota (Legacy):</span> {member.city || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Status Kependudukan:</span> {member.residencyStatus || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Status Tempat Tinggal:</span> {member.livingSituation || '-'}</p>

                  <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-1">Kontak:</h4>
                  <p className={textStyle}><span className="font-semibold">Kontak Yang Bisa Dihubungi:</span> {member.phoneNumber || '-'}</p>

                  <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-1">Status Sosial & Ekonomi:</h4>
                  <p className={textStyle}><span className="font-semibold">Status Perkawinan:</span> {member.maritalStatus || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Pendidikan Terakhir:</span> {member.lastEducation || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Masih Sekolah/Kuliah:</span> {member.isStillStudying === null ? '-' : member.isStillStudying ? 'Ya' : 'Tidak'}</p>
                  <p className={textStyle}><span className="font-semibold">Status Pekerjaan:</span> {member.employmentStatus || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Pendapatan Bulanan:</span> Rp {member.monthlyIncome || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Kepemilikan Usaha:</span> {member.hasOwnBusiness === null ? '-' : member.hasOwnBusiness ? 'Ya' : 'Tidak'}</p>
                  
                  <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-1">Pelatihan:</h4>
                  <p className={textStyle}><span className="font-semibold">Mendapatkan Pelatihan Keterampilan:</span> {member.hasReceivedSkillTraining === null ? '-' : member.hasReceivedSkillTraining ? 'Ya' : 'Tidak'}</p>
                  <p className={textStyle}><span className="font-semibold">Jenis Pelatihan Diikuti:</span> {member.skillTrainingType || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Pelatihan Diinginkan:</span> {member.desiredSkillTraining || '-'}</p>

                  <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-1">Informasi BPJS:</h4>
                  <p className={textStyle}><span className="font-semibold">Memiliki BPJS:</span> {member.hasBpjs ? 'Ya' : 'Tidak'}</p>
                  {member.hasBpjs && (
                    <>
                      <p className={textStyle}><span className="font-semibold">ID BPJS:</span> {member.bpjsId || '-'}</p>
                      {member.bpjsScanUrl && <p className={textStyle}><span className="font-semibold">Pindaian BPJS:</span> <a href={member.bpjsScanUrl} target="_blank" rel="noopener noreferrer" className={fileLinkStyle}>Lihat File</a></p>}
                    </>
                  )}

                  <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-1">Data Kesehatan:</h4>
                  <p className={textStyle}><span className="font-semibold">Akses Layanan Kesehatan:</span> {member.healthServiceAccess || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Penyakit Kronis:</span> {member.chronicIllness || '-'}</p>

                  <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-1">Pengalaman Diskriminasi/Kekerasan:</h4>
                  <p className={textStyle}><span className="font-semibold">Pengalaman Diskriminasi:</span> {member.discriminationExperience || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Jenis Diskriminasi:</span> {member.discriminationType || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Pelaku:</span> {member.discriminationPerpetrator || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Lokasi:</span> {member.discriminationLocation || '-'}</p>
                  <p className={textStyle}><span className="font-semibold">Dilaporkan:</span> {member.wasDiscriminationReported === null ? '-' : member.wasDiscriminationReported ? 'Ya' : 'Tidak'}</p>

                  <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-1">Bantuan Sosial & Komunitas:</h4>
                  <p className={textStyle}><span className="font-semibold">Menerima Bantuan Sosial:</span> {member.receivesSocialAssistance === null ? '-' : member.receivesSocialAssistance ? 'Ya' : 'Tidak'}</p>
                  <p className={textStyle}><span className="font-semibold">Terdaftar DTKS:</span> {member.isRegisteredInDTKS === null ? '-' : member.isRegisteredInDTKS ? 'Ya' : 'Tidak'}</p>
                  <p className={textStyle}><span className="font-semibold">Kelompok Komunitas:</span> {member.communityGroup || '-'}</p>
                  
                  <p className="text-xs text-slate-400 mt-4">Terdaftar pada: {new Date(member.createdAt).toLocaleString('id-ID')}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
import { getCommunityMembers } from '@/actions';
import { CommunityMember } from '../../../prisma/app/generated/prisma';
import Link from 'next/link';
import { Users } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

export const dynamic = 'force-dynamic'; // Ensure data is fetched on every request

export default async function MembersPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    pageSize?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;
  const { members, totalCount, overallTotalCount } = await getCommunityMembers(currentPage, pageSize);

  const totalPages = Math.ceil(totalCount / pageSize);

  const cardStyle = "bg-white shadow-lg rounded-lg p-6 mb-6 w-full border border-slate-200 hover:shadow-xl transition-shadow duration-300";
  const headingStyle = "text-xl font-semibold text-slate-800 mb-3";
  const textStyle = "text-slate-600 mb-2";
  const sectionStyle = "text-lg font-semibold text-slate-700 mt-6 mb-3 pb-2 border-b border-slate-200";
  const fileLinkStyle = "text-sky-600 hover:text-sky-800 underline font-medium";

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-center mb-6">
            <Users className="h-12 w-12 text-slate-700 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Data Anggota Komunitas</h1>
              <p className="text-lg text-slate-600 mt-2">
                Daftar lengkap anggota komunitas yang telah terdaftar
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-center"> 
              <div>
                <h3 className="text-3xl font-bold text-slate-800">{overallTotalCount}</h3>
                <p className="text-slate-600">Total Anggota Terdaftar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Members List */}
        <section className="w-full">
          {members.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-24 w-24 text-slate-300 mx-auto mb-4" />
              <p className="text-xl text-slate-500 mb-2">Belum ada data yang terdaftar</p>
              <p className="text-slate-400">Data anggota akan muncul di sini setelah formulir diisi</p>
              <Link 
                href="/form" 
                className="inline-block mt-6 bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Isi Formulir Sekarang
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {members.map((member: CommunityMember, index: number) => (
                <div key={member.id} className={cardStyle}>
                  {/* Member Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={headingStyle}>
                      {member.firstName} {member.middleName || ''} {member.lastName || ''}
                    </h3>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                      #{(currentPage - 1) * pageSize + index + 1}
                    </span>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Nama Panggilan Komunitas:</span>{' '}
                        {member.communityNickname || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Tempat, Tanggal Lahir:</span>{' '}
                        {member.placeOfBirth || '-'}, {member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString('id-ID') : '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Usia:</span> {member.age || '-'} tahun
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Jenis Kelamin:</span> {member.gender || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Identitas Gender:</span> {member.genderIdentity || '-'}
                      </p>
                    </div>
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Kontak:</span> {member.phoneNumber || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Status Perkawinan:</span> {member.maritalStatus || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Pendidikan Terakhir:</span> {member.lastEducation || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Status Pekerjaan:</span> {member.employmentStatus || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Kelompok Komunitas:</span> {member.communityGroup || '-'}
                      </p>
                    </div>
                  </div>

                  {/* Data Kependudukan */}
                  <h4 className={sectionStyle}>Data Kependudukan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">NIK:</span> {member.nik || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">No. KK:</span> {member.familyCardNumber || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Status E-KTP:</span> {member.ektpStatus || '-'}
                      </p>
                    </div>
                    <div>
                      {member.idScanUrl && (
                        <p className={textStyle}>
                          <span className="font-semibold">Pindaian KTP:</span>{' '}
                          <a href={member.idScanUrl} target="_blank" rel="noopener noreferrer" className={fileLinkStyle}>
                            Lihat File
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Alamat Domisili */}
                  <h4 className={sectionStyle}>Alamat Domisili</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Alamat Lengkap:</span> {member.address || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Kelurahan:</span> {member.domicileKelurahan || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Kecamatan:</span> {member.domicileKecamatan || '-'}
                      </p>
                    </div>
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Kabupaten/Kota:</span> {member.domicileRegencyCity || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Status Kependudukan:</span> {member.residencyStatus || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Status Tempat Tinggal:</span> {member.livingSituation || '-'}
                      </p>
                    </div>
                  </div>

                  {/* Status Sosial & Ekonomi */}
                  <h4 className={sectionStyle}>Status Sosial & Ekonomi</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Masih Sekolah/Kuliah:</span>{' '}
                        {member.isStillStudying === null ? '-' : member.isStillStudying ? 'Ya' : 'Tidak'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Pendapatan Bulanan:</span> Rp {member.monthlyIncome || '-'}
                      </p>
                    </div>
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Kepemilikan Usaha:</span>{' '}
                        {member.hasOwnBusiness === null ? '-' : member.hasOwnBusiness ? 'Ya' : 'Tidak'}
                      </p>
                    </div>
                  </div>

                  {/* Pelatihan */}
                  <h4 className={sectionStyle}>Pelatihan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Mendapatkan Pelatihan Keterampilan:</span>{' '}
                        {member.hasReceivedSkillTraining === null ? '-' : member.hasReceivedSkillTraining ? 'Ya' : 'Tidak'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Jenis Pelatihan Diikuti:</span> {member.skillTrainingType || '-'}
                      </p>
                    </div>
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Pelatihan Diinginkan:</span> {member.desiredSkillTraining || '-'}
                      </p>
                    </div>
                  </div>

                  {/* Informasi BPJS */}
                  <h4 className={sectionStyle}>Informasi BPJS</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Memiliki BPJS:</span>{' '}
                        <span className={member.hasBpjs ? 'text-green-600 font-semibold' : 'text-red-600'}>
                          {member.hasBpjs ? 'Ya' : 'Tidak'}
                        </span>
                      </p>
                      {member.hasBpjs && (
                        <p className={textStyle}>
                          <span className="font-semibold">ID BPJS:</span> {member.bpjsId || '-'}
                        </p>
                      )}
                    </div>
                    <div>
                      {member.hasBpjs && member.bpjsScanUrl && (
                        <p className={textStyle}>
                          <span className="font-semibold">Pindaian BPJS:</span>{' '}
                          <a href={member.bpjsScanUrl} target="_blank" rel="noopener noreferrer" className={fileLinkStyle}>
                            Lihat File
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Data Kesehatan */}
                  <h4 className={sectionStyle}>Data Kesehatan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Akses Layanan Kesehatan:</span> {member.healthServiceAccess || '-'}
                      </p>
                    </div>
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Penyakit Kronis:</span> {member.chronicIllness || '-'}
                      </p>
                    </div>
                  </div>

                  {/* Pengalaman Diskriminasi/Kekerasan */}
                  <h4 className={sectionStyle}>Pengalaman Diskriminasi/Kekerasan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Pengalaman Diskriminasi:</span> {member.discriminationExperience || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Jenis Diskriminasi:</span> {member.discriminationType || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Pelaku:</span> {member.discriminationPerpetrator || '-'}
                      </p>
                    </div>
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Lokasi:</span> {member.discriminationLocation || '-'}
                      </p>
                      <p className={textStyle}>
                        <span className="font-semibold">Dilaporkan:</span>{' '}
                        {member.wasDiscriminationReported === null ? '-' : member.wasDiscriminationReported ? 'Ya' : 'Tidak'}
                      </p>
                    </div>
                  </div>

                  {/* Bantuan Sosial & Komunitas */}
                  <h4 className={sectionStyle}>Bantuan Sosial & Komunitas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Menerima Bantuan Sosial:</span>{' '}
                        <span className={member.receivesSocialAssistance ? 'text-green-600 font-semibold' : 'text-slate-600'}>
                          {member.receivesSocialAssistance === null ? '-' : member.receivesSocialAssistance ? 'Ya' : 'Tidak'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className={textStyle}>
                        <span className="font-semibold">Terdaftar DTKS:</span>{' '}
                        {member.isRegisteredInDTKS === null ? '-' : member.isRegisteredInDTKS ? 'Ya' : 'Tidak'}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-400">
                      Terdaftar pada: {new Date(member.createdAt).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`/admin?page=${currentPage - 1}&pageSize=${pageSize}`} />
                  </PaginationItem>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const showPageLink = 
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1) ||
                    (currentPage <= 2 && page <= 3) // show first 3 pages if current is 1 or 2
                    || (currentPage >= totalPages - 1 && page >= totalPages - 2); // show last 3 pages if current is near end

                  const showEllipsis = 
                    (page === currentPage - 2 && currentPage > 2 && !(currentPage <=3)) ||
                    (page === currentPage + 2 && currentPage < totalPages - 1 && !(currentPage >= totalPages - 2));

                  if (showPageLink) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href={`/admin?page=${page}&pageSize=${pageSize}`}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (showEllipsis) {
                    return (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/admin?page=${currentPage + 1}&pageSize=${pageSize}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PendingSubmission, SubmissionStatus } from '../../../prisma/app/generated/prisma';
import { formatDateTime } from '@/utils/formHandlers';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';
import { approveSubmission, rejectSubmission } from '@/actions/pendingSubmissions';
import { RejectModal } from './RejectModal';

interface PendingSubmissionCardProps {
  submission: PendingSubmission;
  currentUserId: string;
  onUpdate: () => void;
}

export function PendingSubmissionCard({ submission, currentUserId, onUpdate }: PendingSubmissionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const fullName = `${submission.firstName} ${submission.middleName || ''} ${submission.lastName || ''}`.trim();

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      const result = await approveSubmission(submission.id, currentUserId);
      if (result.success) {
        toast.success('Formulir berhasil disetujui dan data member telah dibuat');
        onUpdate();
      } else {
        toast.error(result.error || 'Gagal menyetujui formulir');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menyetujui formulir');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (rejectionReason: string) => {
    setIsProcessing(true);
    try {
      const result = await rejectSubmission(submission.id, currentUserId, rejectionReason);
      if (result.success) {
        toast.success('Formulir berhasil ditolak');
        onUpdate();
      } else {
        toast.error(result.error || 'Gagal menolak formulir');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menolak formulir');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case SubmissionStatus.PENDING:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} className="mr-1" />
            Menunggu Review
          </span>
        );
      case SubmissionStatus.APPROVED:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Disetujui
          </span>
        );
      case SubmissionStatus.REJECTED:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Ditolak
          </span>
        );
    }
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{fullName}</h3>
            <p className="text-sm text-slate-600 flex items-center gap-1">
              <Mail size={14} />
              {submission.submitterEmail}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(submission.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone size={14} />
            <span>{submission.phoneNumber || '-'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={14} />
            <span>{submission.city || '-'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar size={14} />
            <span>Dikirim: {formatDateTime(submission.createdAt)}</span>
          </div>
        </div>

        {submission.status === SubmissionStatus.PENDING && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-600 hover:text-slate-900 text-sm font-medium flex items-center gap-1"
            >
              {isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowRejectModal(true)}
                disabled={isProcessing}
                className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center gap-1"
              >
                <XCircle size={14} />
                Tolak
              </button>
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
              >
                <CheckCircle size={14} />
                {isProcessing ? 'Memproses...' : 'Setujui'}
              </button>
            </div>
          </div>
        )}

        {submission.status === SubmissionStatus.REJECTED && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm font-medium text-red-800">Alasan Penolakan:</p>
            <p className="text-sm text-red-700 mt-1">{submission.rejectionReason}</p>
            {submission.reviewedAt && (
              <p className="text-xs text-red-600 mt-2">
                Ditinjau pada: {formatDateTime(submission.reviewedAt)}
              </p>
            )}
          </div>
        )}

        {submission.status === SubmissionStatus.APPROVED && submission.reviewedAt && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700">
              Disetujui pada: {formatDateTime(submission.reviewedAt)}
            </p>
          </div>
        )}

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="text-md font-semibold text-slate-900 mb-4">Detail Lengkap Formulir</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              
              {/* Personal Information */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Informasi Pribadi</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Nama Lengkap:</span> {fullName}</p>
                  <p><span className="text-slate-600 font-medium">NIK:</span> {submission.nik || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Tempat Lahir:</span> {submission.placeOfBirth || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Tanggal Lahir:</span> {submission.dateOfBirth ? new Date(submission.dateOfBirth).toLocaleDateString('id-ID') : '-'}</p>
                  <p><span className="text-slate-600 font-medium">Usia:</span> {submission.age || '-'} tahun</p>
                  <p><span className="text-slate-600 font-medium">Jenis Kelamin:</span> {submission.gender?.replace('PRIA', 'Pria').replace('WANITA', 'Wanita') || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Identitas Gender:</span> {submission.genderIdentity?.replace('WARIA', 'Waria').replace('NONE', 'Tidak Ada') || 'Tidak Ada'}</p>
                  <p><span className="text-slate-600 font-medium">Status Perkawinan:</span> {submission.maritalStatus?.replace('BELUM_KAWIN', 'Belum Kawin').replace('KAWIN', 'Kawin').replace('CERAI', 'Cerai') || '-'}</p>
                </div>
              </div>

              {/* Address & Residency */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Alamat & Domisili</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Alamat:</span> {submission.address || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Kota:</span> {submission.city || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Kecamatan:</span> {submission.domicileKecamatan || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Kelurahan:</span> {submission.domicileKelurahan || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Kab/Kota Domisili:</span> {submission.domicileRegencyCity || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Status Domisili:</span> {submission.residencyStatus?.replace('PENDATANG', 'Pendatang').replace('PENDUDUK_TETAP', 'Penduduk Tetap') || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Situasi Tempat Tinggal:</span> {submission.livingSituation?.replace('BERSAMA_ORANG_TUA', 'Bersama Orang Tua').replace('RUMAH_PRIBADI', 'Rumah Pribadi').replace('SEWA_KONTRAK', 'Sewa/Kontrak') || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Status E-KTP:</span> {submission.ektpStatus?.replace('MEMILIKI', 'Memiliki').replace('TIDAK_MEMILIKI', 'Tidak Memiliki').replace('DALAM_PROSES', 'Dalam Proses') || '-'}</p>
                  <p><span className="text-slate-600 font-medium">No. Kartu Keluarga:</span> {submission.familyCardNumber || '-'}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Informasi Kontak</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Email:</span> {submission.submitterEmail}</p>
                  <p><span className="text-slate-600 font-medium">No. Telepon:</span> {submission.phoneNumber || '-'}</p>
                </div>
              </div>

              {/* Education & Employment */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Pendidikan & Pekerjaan</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Pendidikan Terakhir:</span> {submission.lastEducation?.replace('SD', 'SD').replace('SMP', 'SMP').replace('SMA_SMK', 'SMA/SMK').replace('PERGURUAN_TINGGI', 'Perguruan Tinggi').replace('TIDAK_SEKOLAH', 'Tidak Sekolah') || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Masih Bersekolah:</span> {submission.isStillStudying ? 'Ya' : 'Tidak'}</p>
                  <p><span className="text-slate-600 font-medium">Status Pekerjaan:</span> {submission.employmentStatus?.replace('BEKERJA', 'Bekerja').replace('TIDAK_BEKERJA', 'Tidak Bekerja').replace('PELAJAR', 'Pelajar').replace('MAHASISWA', 'Mahasiswa') || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Deskripsi Pekerjaan:</span> {submission.jobDescription || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Memiliki Usaha:</span> {submission.hasOwnBusiness ? 'Ya' : 'Tidak'}</p>
                  <p><span className="text-slate-600 font-medium">Detail Usaha:</span> {submission.businessDetails || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Pendapatan Bulanan:</span> {submission.monthlyIncome || '-'}</p>
                </div>
              </div>

              {/* Community Information */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Informasi Komunitas</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Kelompok Komunitas:</span> {submission.communityGroup || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Nama Panggilan Komunitas:</span> {submission.communityNickname || '-'}</p>
                </div>
              </div>

              {/* Training Information */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Informasi Pelatihan</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Pernah Ikut Pelatihan:</span> {submission.hasReceivedSkillTraining ? 'Ya' : 'Tidak'}</p>
                  {submission.skillTrainingTypes && submission.skillTrainingTypes.length > 0 && (
                    <div>
                      <span className="text-slate-600 font-medium">Jenis Pelatihan yang Diikuti:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {submission.skillTrainingTypes.map((training, index) => (
                          <li key={index} className="text-slate-700">{training}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {submission.trainingOrganizers && submission.trainingOrganizers.length > 0 && (
                    <div>
                      <span className="text-slate-600 font-medium">Penyelenggara Pelatihan:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {submission.trainingOrganizers.map((organizer, index) => (
                          <li key={index} className="text-slate-700">{organizer}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {submission.desiredSkillTrainings && submission.desiredSkillTrainings.length > 0 && (
                    <div>
                      <span className="text-slate-600 font-medium">Pelatihan yang Diinginkan:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {submission.desiredSkillTrainings.map((training, index) => (
                          <li key={index} className="text-slate-700">{training}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Security */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Jaminan Sosial</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Jenis BPJS:</span> {submission.socialSecurityType?.replace('NONE', 'Tidak Memiliki').replace('BPJS_KESEHATAN', 'BPJS Kesehatan').replace('BPJS_TK', 'BPJS Ketenagakerjaan').replace('OTHER', 'Lainnya') || 'Tidak Memiliki'}</p>
                  <p><span className="text-slate-600 font-medium">ID Jaminan Sosial:</span> {submission.socialSecurityId || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Jaminan Sosial Lainnya:</span> {submission.socialSecurityOther || '-'}</p>
                </div>
              </div>

              {/* Health Information */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Informasi Kesehatan</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Akses Layanan Kesehatan:</span> {submission.healthServiceAccess?.replace('PUSKESMAS', 'Puskesmas').replace('RUMAH_SAKIT', 'Rumah Sakit').replace('KLINIK', 'Klinik').replace('TIDAK_PERNAH', 'Tidak Pernah') || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Penyakit Kronis:</span> {submission.chronicIllness || '-'}</p>
                </div>
              </div>

              {/* Disability Information */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Informasi Disabilitas</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Penyandang Disabilitas:</span> {submission.isPersonWithDisability ? 'Ya' : 'Tidak'}</p>
                  {submission.disabilityTypes && submission.disabilityTypes.length > 0 && (
                    <div>
                      <span className="text-slate-600 font-medium">Jenis Disabilitas:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {submission.disabilityTypes.map((type, index) => (
                          <li key={index} className="text-slate-700">
                            {type.replace('PHYSICAL', 'Fisik').replace('INTELLECTUAL', 'Intelektual').replace('MENTAL', 'Mental').replace('SENSORY', 'Sensorik')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p><span className="text-slate-600 font-medium">Catatan Disabilitas:</span> {submission.disabilityNotes || '-'}</p>
                </div>
              </div>

              {/* Discrimination Information */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Informasi Diskriminasi</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Pengalaman Diskriminasi:</span> {submission.discriminationExperience?.replace('TIDAK_PERNAH', 'Tidak Pernah').replace('PERNAH_MENGALAMI', 'Pernah Mengalami') || 'Tidak Pernah'}</p>
                  {submission.discriminationTypes && submission.discriminationTypes.length > 0 && (
                    <div>
                      <span className="text-slate-600 font-medium">Jenis Diskriminasi:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {submission.discriminationTypes.map((type, index) => (
                          <li key={index} className="text-slate-700">
                            {type.replace('PHYSICAL', 'Fisik').replace('ECONOMIC', 'Ekonomi').replace('VERBAL', 'Verbal').replace('SEXUAL', 'Seksual').replace('PSYCHOLOGICAL', 'Psikologis').replace('SOCIAL', 'Sosial')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {submission.discriminationPerpetrators && submission.discriminationPerpetrators.length > 0 && (
                    <div>
                      <span className="text-slate-600 font-medium">Pelaku Diskriminasi:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {submission.discriminationPerpetrators.map((perpetrator, index) => (
                          <li key={index} className="text-slate-700">
                            {perpetrator.replace('FAMILY_RELATIVE', 'Keluarga/Saudara').replace('COLLEAGUE', 'Rekan Kerja').replace('CUSTOMER_GUEST', 'Pelanggan/Tamu').replace('OTHER', 'Lainnya')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p><span className="text-slate-600 font-medium">Pelaku Diskriminasi Lainnya:</span> {submission.discriminationPerpetratorOther || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Lokasi Kejadian:</span> {submission.discriminationLocation || '-'}</p>
                  <p><span className="text-slate-600 font-medium">Dilaporkan:</span> {submission.wasDiscriminationReported ? 'Ya' : 'Tidak'}</p>
                </div>
              </div>

              {/* Social Assistance */}
              <div>
                <h5 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-200">Bantuan Sosial</h5>
                <div className="space-y-2">
                  <p><span className="text-slate-600 font-medium">Menerima Bantuan Sosial:</span> {submission.receivesSocialAssistance ? 'Ya' : 'Tidak'}</p>
                  <p><span className="text-slate-600 font-medium">Terdaftar di DTKS:</span> {submission.isRegisteredInDTKS ? 'Ya' : 'Tidak'}</p>
                  {submission.otherSocialAssistance && submission.otherSocialAssistance.length > 0 && (
                    <div>
                      <span className="text-slate-600 font-medium">Bantuan Sosial Lainnya:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {submission.otherSocialAssistance.map((assistance, index) => (
                          <li key={index} className="text-slate-700">{assistance}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <RejectModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        memberName={fullName}
        onReject={handleReject}
        isProcessing={isProcessing}
      />
    </>
  );
}
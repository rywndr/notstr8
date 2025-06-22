'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Edit3, Trash2, Phone, Calendar, MapPin, 
  ChevronDown, ChevronUp, User, IdCard, TrendingUp, Award, Shield, Heart, AlertTriangle, HandHeart
} from 'lucide-react'
import { CommunityMember, SocialSecurityType } from '../../../prisma/app/generated/prisma'
import { MemberSection } from './MemberSection'
import { DeleteModal } from './DeleteModal'
import { formatDate, formatDateTime, formatDisplayValue } from '@/utils/formHandlers'

interface MemberTableRowProps {
  member: CommunityMember
  onDelete?: (id: string) => void
  onEdit?: (member: CommunityMember) => void
}

const formatPhone = (phone: string | null) => {
  if (!phone) return '-'
  return phone.replace('+62', '0')
}

const socialSecurityTypeDisplay: Record<string, string> = {
  [SocialSecurityType.NONE]: 'Tidak Ada',
  [SocialSecurityType.BPJS_KESEHATAN]: 'BPJS Kesehatan',
  [SocialSecurityType.BPJS_TK]: 'BPJS-TK',
  [SocialSecurityType.OTHER]: 'Lainnya',
};

export function MemberTableRow({ member, onDelete, onEdit }: MemberTableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim()

  return (
    <>
      <tr className="hover:bg-slate-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-slate-900">{fullName || '-'}</div>
          <div className="text-xs text-slate-500">{member.communityNickname || member.gender?.replace(/_/g, ' ')}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{member.nik || '-'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{member.phoneNumber || '-'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{member.city || '-'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
          {member.socialSecurityType ? socialSecurityTypeDisplay[member.socialSecurityType] : '-'}
          {member.socialSecurityType === SocialSecurityType.OTHER && member.socialSecurityOther && ` (${member.socialSecurityOther})`}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatDate(member.createdAt)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-600 hover:text-slate-900 p-1 rounded transition-colors cursor-pointer"
              title={isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <button
              onClick={() => onEdit?.(member)}
              className="text-slate-600 hover:text-slate-900 p-1 rounded transition-colors"
              title="Edit"
            >
              <Edit3 size={18} />
            </button>

            <Link
              href={`/admin/history/${member.id}`}
              className="text-slate-600 hover:text-slate-900 p-1 rounded transition-colors"
              title="Riwayat"
            >
              <Calendar size={18} />
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-red-600 hover:text-red-900 p-1 rounded transition-colors hover:bg-red-50"
              title="Hapus"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded row with detailed information */}
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={7} className="px-6 py-6">
            <div className="space-y-6 max-w-6xl">
              {/* Basic info grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-700">Informasi Pribadi</h4>
                  </div>
                  <BasicInfo member={member} />
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-700">Kontak & Status</h4>
                  </div>
                  <ContactInfo member={member} />
                </div>
              </div>

              {/* Detailed sections */}
              <div className="space-y-4">
                <MemberSection title="Data Kependudukan" icon={IdCard}>
                  <PopulationData member={member} />
                </MemberSection>

                <MemberSection title="Alamat Domisili" icon={MapPin}>
                  <AddressData member={member} />
                </MemberSection>

                <MemberSection title="Status Sosial & Ekonomi" icon={TrendingUp}>
                  <SocialEconomicData member={member} />
                </MemberSection>

                <MemberSection title="Pelatihan" icon={Award}>
                  <TrainingData member={member} />
                </MemberSection>

                <MemberSection title="Penyandang Disabilitas" icon={Shield}>
                  <DisabilityData member={member} />
                </MemberSection>

                <MemberSection title="Informasi Jaminan Sosial" icon={Shield}>
                  <SocialSecurityData member={member} />
                </MemberSection>

                <MemberSection title="Data Kesehatan" icon={Heart}>
                  <HealthData member={member} />
                </MemberSection>

                <MemberSection title="Pengalaman Diskriminasi/Kekerasan" icon={AlertTriangle}>
                  <DiscriminationData member={member} />
                </MemberSection>

                <MemberSection title="Bantuan Sosial & Komunitas" icon={HandHeart}>
                  <SocialAssistanceData member={member} />
                </MemberSection>
              </div>

              {/* footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 pb-6 rounded-b-lg">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={12} />
                    <p className="text-xs">
                      Terdaftar pada: {formatDateTime(member.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={12} />
                    <p className="text-xs">
                      Diperbarui pada: {formatDateTime(member.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        memberName={fullName}
        memberId={member.id}
        onDelete={(id) => {
          onDelete?.(id);
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
      />
    </>
  )
}

function DataField({ label, value, className = "" }: { label: string; value: string | null | undefined; className?: string }) {
  return (
    <div className={`mb-2 flex flex-col sm:flex-row sm:justify-between gap-1 ${className}`}>
      <span className="font-medium text-gray-700 text-xs">{label}:</span>
      <span className="text-gray-600 text-xs">{value || '-'}</span>
    </div>
  );
}

function BooleanField({ label, value, className = "" }: { label: string; value: boolean | null | undefined; className?: string }) {
  const displayValue = formatDisplayValue(value);
  const colorClass = value === true ? 'text-green-600' : value === false ? 'text-red-500' : 'text-gray-600';
  
  return (
    <div className={`mb-2 flex flex-col sm:flex-row sm:justify-between gap-1 ${className}`}>
      <span className="font-medium text-gray-700 text-xs">{label}:</span>
      <span className={`text-xs font-medium ${colorClass}`}>{displayValue}</span>
    </div>
  );
}

function BasicInfo({ member }: { member: CommunityMember }) {
  return (
    <div>
      <DataField label="Nama Panggilan Komunitas" value={member.communityNickname} />
      <DataField 
        label="Tempat, Tanggal Lahir" 
        value={`${member.placeOfBirth || '-'}, ${formatDate(member.dateOfBirth)}`} 
      />
      <DataField label="Usia" value={member.age ? `${member.age} tahun` : null} />
      <DataField label="Jenis Kelamin" value={member.gender?.replace(/_/g, ' ')} />
      <DataField label="Identitas Gender" value={member.genderIdentity?.replace(/_/g, ' ')} />
    </div>
  );
}

function ContactInfo({ member }: { member: CommunityMember }) {
  return (
    <div>
      <DataField label="Kontak" value={formatPhone(member.phoneNumber)} />
      <DataField label="Status Perkawinan" value={member.maritalStatus?.replace(/_/g, ' ')} />
      <DataField label="Pendidikan Terakhir" value={member.lastEducation?.replace(/_/g, ' ')} />
      <DataField label="Status Pekerjaan" value={member.employmentStatus?.replace(/_/g, ' ')} />
      <DataField label="Kelompok Komunitas" value={member.communityGroup} />
    </div>
  );
}

function PopulationData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <DataField label="NIK" value={member.nik} />
        <DataField label="No. KK" value={member.familyCardNumber} />
        <DataField label="Status E-KTP" value={member.ektpStatus?.replace(/_/g, ' ')} />
      </div>
      <div>
        <DataField label="Pindaian KTP" value={member.idScanUrl ? 'Tersedia' : 'Tidak ada'} />
      </div>
    </div>
  );
}

function AddressData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <DataField label="Alamat Lengkap" value={member.address} />
        <DataField label="Kelurahan" value={member.domicileKelurahan} />
        <DataField label="Kecamatan" value={member.domicileKecamatan} />
      </div>
      <div>
        <DataField label="Kabupaten/Kota" value={member.domicileRegencyCity} />
        <DataField label="Status Kependudukan" value={member.residencyStatus?.replace(/_/g, ' ')} />
        <DataField label="Status Tempat Tinggal" value={member.livingSituation?.replace(/_/g, ' ')} />
      </div>
    </div>
  );
}

function SocialEconomicData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <BooleanField label="Masih Sekolah/Kuliah" value={member.isStillStudying} />
        {member.employmentStatus === "BEKERJA" && (
          <DataField label="Jenis Pekerjaan" value={member.jobDescription} />
        )}
        <DataField label="Pendapatan Bulanan" value={member.monthlyIncome ? `Rp ${member.monthlyIncome}` : null} />
      </div>
      <div>
        <BooleanField label="Kepemilikan Usaha" value={member.hasOwnBusiness} />
        {member.hasOwnBusiness && (
          <DataField label="Detail Usaha" value={member.businessDetails} />
        )}
      </div>
    </div>
  );
}

function TrainingData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <BooleanField label="Pelatihan Keterampilan" value={member.hasReceivedSkillTraining} />
        <DataField label="Jenis Pelatihan Diikuti" value={member.skillTrainingTypes?.length ? member.skillTrainingTypes.join(', ') : '-'} />
        <DataField label="Penyelenggara Pelatihan" value={member.trainingOrganizers?.length ? member.trainingOrganizers.join(', ') : '-'} />
      </div>
      <div>
        <DataField label="Pelatihan Diinginkan" value={member.desiredSkillTrainings?.length ? member.desiredSkillTrainings.join(', ') : '-'} />
      </div>
    </div>
  );
}

function DisabilityData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <BooleanField label="Penyandang Disabilitas" value={member.isPersonWithDisability} />
        {member.isPersonWithDisability && member.disabilityTypes && member.disabilityTypes.length > 0 && (
          <DataField label="Jenis Disabilitas" value={member.disabilityTypes.join(', ').replace(/_/g, ' ')} />
        )}
      </div>
      <div>
        {member.isPersonWithDisability && (
          <DataField label="Catatan Disabilitas" value={member.disabilityNotes} />
        )}
      </div>
    </div>
  );
}

function SocialSecurityData({ member }: { member: CommunityMember }) {
  const hasSocialSecurity = member.socialSecurityType && member.socialSecurityType !== SocialSecurityType.NONE;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <DataField label="Jenis Jaminan Sosial" value={member.socialSecurityType ? socialSecurityTypeDisplay[member.socialSecurityType] : '-'} />
        {member.socialSecurityType === SocialSecurityType.OTHER && (
          <DataField label="Lainnya" value={member.socialSecurityOther} />
        )}
        {hasSocialSecurity && <DataField label="Nomor Jaminan Sosial" value={member.socialSecurityId} />}
      </div>
      <div>
        {hasSocialSecurity && (
          <DataField label="Pindaian Kartu" value={member.socialSecurityScanUrl ? 'Tersedia' : 'Tidak ada'} />
        )}
      </div>
    </div>
  );
}

function HealthData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <DataField label="Akses Layanan Kesehatan" value={member.healthServiceAccess?.replace(/_/g, ' ')} />
      </div>
      <div>
        <DataField label="Penyakit Kronis" value={member.chronicIllness} />
      </div>
    </div>
  );
}

function DiscriminationData({ member }: { member: CommunityMember }) {
  const hasExperience = member.discriminationExperience === "PERNAH_MENGALAMI";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <DataField label="Pengalaman Diskriminasi" value={member.discriminationExperience?.replace(/_/g, ' ')} />
        {hasExperience && (
          <>
            <DataField label="Jenis Diskriminasi" value={member.discriminationTypes?.length ? member.discriminationTypes.join(', ').replace(/_/g, ' ') : '-'} />
            <DataField label="Pelaku" value={member.discriminationPerpetrators?.length ? member.discriminationPerpetrators.join(', ').replace(/_/g, ' ') : '-'} />
          </>
        )}
      </div>
      <div>
        {hasExperience && (
          <>
            <DataField label="Lokasi" value={member.discriminationLocation} />
            <BooleanField label="Dilaporkan" value={member.wasDiscriminationReported} />
          </>
        )}
      </div>
    </div>
  );
}

function SocialAssistanceData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <BooleanField label="Menerima Bantuan Sosial" value={member.receivesSocialAssistance} />
        {member.otherSocialAssistance && member.otherSocialAssistance.length > 0 && (
          <DataField label="Bantuan Sosial Lainnya" value={member.otherSocialAssistance.join(', ')} />
        )}
      </div>
      <div>
        <BooleanField label="Terdaftar DTKS" value={member.isRegisteredInDTKS} />
      </div>
    </div>
  );
}

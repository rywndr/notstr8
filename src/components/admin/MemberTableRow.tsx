'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Edit, Phone, Calendar, MapPin, Briefcase, GraduationCap, 
  ChevronDown, ChevronUp, User, IdCard, TrendingUp, Award, 
  Shield, Heart, AlertTriangle, HandHeart, Trash2
} from 'lucide-react'
import type { CommunityMember } from '../../../prisma/app/generated/prisma'
import { MemberSection } from './MemberSection'
import { DeleteModal } from './DeleteModal'

interface MemberTableRowProps {
  member: CommunityMember
}

const formatPhone = (phone: string | null) => {
  if (!phone) return '-'
  return phone.replace('+62', '0')
}

const formatDate = (date: Date | null) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID')
}

export function MemberTableRow({ member }: MemberTableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim()

  const getBadgeColor = (type: string, value?: string) => {
    switch(type) {
      case 'employment':
        switch(value) {
          case 'BEKERJA': return 'bg-green-100 text-green-800'
          case 'TIDAK_BEKERJA': return 'bg-red-100 text-red-800'
          case 'PELAJAR': return 'bg-blue-100 text-blue-800'
          case 'MAHASISWA': return 'bg-purple-100 text-purple-800'
          default: return 'bg-gray-100 text-gray-700'
        }
      case 'education':
        switch(value) {
          case 'SD': return 'bg-yellow-100 text-yellow-800'
          case 'SMP': return 'bg-orange-100 text-orange-800'
          case 'SMA_SMK': return 'bg-blue-100 text-blue-800'
          case 'PERGURUAN_TINGGI': return 'bg-purple-100 text-purple-800'
          case 'TIDAK_SEKOLAH': return 'bg-gray-100 text-gray-800'
          default: return 'bg-gray-100 text-gray-700'
        }
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="text-sm font-medium text-gray-900">{fullName}</div>
            {member.communityNickname && (
              <div className="text-xs text-gray-500">
                <span className="text-xs text-gray-500">alias </span>
                &quot;{member.communityNickname}&quot;</div>
            )}
            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {formatPhone(member.phoneNumber)}
            </div>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            {member.domicileRegencyCity || '-'}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Calendar className="w-3 h-3" />
            {member.age ? `${member.age} tahun` : '-'}
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md ${getBadgeColor('education', member.lastEducation || '')}`}>
            <GraduationCap className="w-3 h-3" />
            {member.lastEducation || '-'}
          </span>
          {member.isStillStudying && (
            <div className="text-xs text-blue-600 mt-1">Masih bersekolah</div>
          )}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md ${getBadgeColor('employment', member.employmentStatus || '')}`}>
            <Briefcase className="w-3 h-3" />
            {member.employmentStatus || '-'}
          </span>
          {member.jobDescription && (
            <div className="text-xs text-gray-500 mt-1">{member.jobDescription}</div>
          )}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="space-y-1">
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${
              member.hasBpjs ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              BPJS: {member.hasBpjs ? 'YA' : 'TIDAK'}
            </span>
            <br />
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${
              member.receivesSocialAssistance === null 
                ? 'bg-gray-100 text-gray-800' 
                : member.receivesSocialAssistance 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
            }`}>
              Bansos: {member.receivesSocialAssistance === null ? '-' : member.receivesSocialAssistance ? 'YA' : 'TIDAK'}
            </span>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="flex items-center gap-1 text-xs">
            <Calendar className="w-3 h-3" />
            <span className="text-gray-600">Terdaftar pada:</span>
          </div>
          <div className="text-xs font-medium text-gray-900">
            {formatDate(member.createdAt)}
          </div>
          <div className="text-xs">
            {new Date(member.createdAt).toLocaleTimeString('id-ID', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="flex items-center gap-1 text-xs mt-1">
            <Calendar className="w-3 h-3" />
            <span className="text-gray-600">Diperbarui pada:</span>
          </div>
          <div className="text-xs text-gray-700">
            {formatDate(member.updatedAt)}
          </div>
          <div className="text-xs">
            {new Date(member.updatedAt).toLocaleTimeString('id-ID', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-600 hover:text-slate-900 p-1 rounded transition-colors cursor-pointer"
              title={isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <Link
              href={`/admin/edit/${member.id}`}
              className="text-slate-600 hover:text-slate-900 p-1 rounded transition-colors"
              title="Edit"
            >
              <Edit size={16} />
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-red-600 hover:text-red-900 p-1 rounded transition-colors hover:bg-red-50"
              title="Hapus"
            >
              <Trash2 size={16} />
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

                <MemberSection title="Informasi BPJS" icon={Shield}>
                  <BpjsData member={member} />
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
                      Terdaftar pada: {formatDate(member.createdAt)} {new Date(member.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={12} />
                    <p className="text-xs">
                      Diperbarui pada: {formatDate(member.updatedAt)} {new Date(member.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
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

function BooleanField({ label, value, className = "" }: { label: string; value: boolean | null; className?: string }) {
  const displayValue = value === null ? '-' : value ? 'Ya' : 'Tidak';
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
      <DataField label="Jenis Kelamin" value={member.gender} />
      <DataField label="Identitas Gender" value={member.genderIdentity} />
    </div>
  );
}

function ContactInfo({ member }: { member: CommunityMember }) {
  return (
    <div>
      <DataField label="Kontak" value={formatPhone(member.phoneNumber)} />
      <DataField label="Status Perkawinan" value={member.maritalStatus} />
      <DataField label="Pendidikan Terakhir" value={member.lastEducation} />
      <DataField label="Status Pekerjaan" value={member.employmentStatus} />
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
        <DataField label="Status E-KTP" value={member.ektpStatus} />
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
        <DataField label="Status Kependudukan" value={member.residencyStatus} />
        <DataField label="Status Tempat Tinggal" value={member.livingSituation} />
      </div>
    </div>
  );
}

function SocialEconomicData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <BooleanField label="Masih Sekolah/Kuliah" value={member.isStillStudying} />
        <DataField label="Pendapatan Bulanan" value={member.monthlyIncome ? `Rp ${member.monthlyIncome}` : null} />
      </div>
      <div>
        <BooleanField label="Kepemilikan Usaha" value={member.hasOwnBusiness} />
        <DataField label="Detail Usaha" value={member.businessDetails} />
      </div>
    </div>
  );
}

function TrainingData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <BooleanField label="Pelatihan Keterampilan" value={member.hasReceivedSkillTraining} />
        <DataField label="Jenis Pelatihan Diikuti" value={member.skillTrainingType} />
      </div>
      <div>
        <DataField label="Pelatihan Diinginkan" value={member.desiredSkillTraining} />
      </div>
    </div>
  );
}

function BpjsData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <BooleanField label="Memiliki BPJS" value={member.hasBpjs} />
        {member.hasBpjs && <DataField label="ID BPJS" value={member.bpjsId} />}
      </div>
      <div>
        {member.hasBpjs && (
          <DataField label="Pindaian BPJS" value={member.bpjsScanUrl ? 'Tersedia' : 'Tidak ada'} />
        )}
      </div>
    </div>
  );
}

function HealthData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <DataField label="Akses Layanan Kesehatan" value={member.healthServiceAccess} />
      </div>
      <div>
        <DataField label="Penyakit Kronis" value={member.chronicIllness} />
      </div>
    </div>
  );
}

function DiscriminationData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <DataField label="Pengalaman Diskriminasi" value={member.discriminationExperience} />
        <DataField label="Jenis Diskriminasi" value={member.discriminationType} />
        <DataField label="Pelaku" value={member.discriminationPerpetrator} />
      </div>
      <div>
        <DataField label="Lokasi" value={member.discriminationLocation} />
        <BooleanField label="Dilaporkan" value={member.wasDiscriminationReported} />
      </div>
    </div>
  );
}

function SocialAssistanceData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <BooleanField label="Menerima Bantuan Sosial" value={member.receivesSocialAssistance} />
      </div>
      <div>
        <BooleanField label="Terdaftar DTKS" value={member.isRegisteredInDTKS} />
      </div>
    </div>
  );
}

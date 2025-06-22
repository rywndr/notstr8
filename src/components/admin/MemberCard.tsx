'use client';

import { useState, useEffect } from 'react';
import { CommunityMember, SocialSecurityType, DiscriminationPerpetrator } from '../../../prisma/app/generated/prisma';
import { DeleteModal } from './DeleteModal';
import { MemberSection } from './MemberSection';
import { 
  User, Phone, MapPin, Users, MoreVertical, Edit3, Trash2, 
  IdCard, TrendingUp, Award, Shield, Heart, AlertTriangle, Users2, Accessibility, Building, FileText,
  ChevronUp, ChevronDown, Briefcase, BookOpen, Calendar
} from 'lucide-react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { formatDate, formatDateTime, formatDisplayValue, getBadgeColor } from '@/utils/formHandlers';

interface MemberCardProps {
  member: CommunityMember;
  onDelete?: (id: string) => void;
  isUserView?: boolean; // To hide admin actions for user's own card view
}

const styles = {
  card: "bg-white shadow-lg rounded-xl p-6 mb-6 w-full border border-slate-200 hover:shadow-xl transition-all duration-300 hover:border-gray-300",
  expandedCard: "bg-white shadow-lg rounded-xl p-8 mb-8 w-full border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:border-gray-300",
  heading: "text-xl font-bold text-slate-800 mb-2",
  expandedHeading: "text-2xl font-bold text-slate-800 mb-4",
  text: "text-slate-600 mb-3",
  fileLink: "text-sky-600 hover:text-sky-800 underline font-medium inline-flex items-center gap-1",
  iconBox: "w-8 h-8 rounded-lg flex items-center justify-center text-gray-600",
  badge: "bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold",
  toggleBtn: "flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 font-medium text-sm",
  statBadge: "px-2 py-1 rounded-md text-xs font-medium",
};

export function MemberCard({ member, onDelete, isUserView }: MemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim();

  return (
    <>
      <div className={isExpanded ? styles.expandedCard : styles.card}>
        {/* header w/ accent */}
        <div className={`relative ${isExpanded ? 'mb-6' : 'mb-4'}`}>
          {isExpanded ? (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-300 rounded-t-xl"></div>
          ) : (
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 rounded-t-xl"></div>
          )}
          <div className={`flex justify-between items-start ${isExpanded ? 'pt-4' : 'pt-3'}`}>
            <div className="flex items-center gap-3">
              <div className={styles.iconBox}>
                <User size={18} />
              </div>
              <div>
                <h3 className={isExpanded ? styles.expandedHeading : styles.heading}>{fullName}</h3>
                {member.communityNickname && (
                  <p className="text-gray-600 text-sm font-medium">
                    <span className="text-xs text-gray-500">alias </span>
                    &quot;{member.communityNickname}&quot;</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              
              <button
                onClick={toggleExpand}
                className={styles.toggleBtn}
              >
                {isExpanded ? 'Tutup' : 'Detail'}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {/* action dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <MoreVertical size={16} className="text-slate-600" />
                </button>
                
                {showActions && !isUserView && (
                  <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                    <Link
                      href={`/admin/edit/${member.id}`}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      onClick={() => setShowActions(false)}
                    >
                      <Edit3 size={14} />
                      Edit
                    </Link>
                    <Link
                      href={`/admin/history/${member.id}`}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      onClick={() => setShowActions(false)}
                    >
                      <Calendar size={14} />
                      Riwayat
                    </Link>
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setShowActions(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* basic preview when collapsed */}
        {!isExpanded && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <span className="text-slate-700">{member.phoneNumber || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span className="text-slate-700">{member.domicileRegencyCity || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-500" />
                <span className="text-slate-700">{member.communityGroup || '-'}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {member.employmentStatus && (
                <span className={`${styles.statBadge} ${getBadgeColor('employment', member.employmentStatus)}`}>
                  <Briefcase size={12} className="inline mr-1" />
                  {member.employmentStatus.toUpperCase()}
                </span>
              )}
              {member.isStillStudying != null && (
                <span className={`${styles.statBadge} ${member.isStillStudying ? 'bg-cyan-100 text-cyan-800' : 'bg-amber-100 text-amber-800'}`}>
                  <BookOpen size={12} className="inline mr-1" />
                  {member.isStillStudying ? 'MASIH BERSEKOLAH' : 'TIDAK BERSEKOLAH'}
                </span>
              )}
              {member.age && (
                <span className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs font-medium">
                  {member.age} TAHUN
                </span>
              )}
              {member.gender && (
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getBadgeColor('gender', member.gender)}`}>
                  {member.gender.toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="border-t border-slate-200 pt-3 mt-3 text-sm grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <p className="text-slate-500 text-xs pb-1">Status Perkawinan</p>
                <p className={`font-medium text-xs px-2 py-1 rounded ${getBadgeColor('marital', member.maritalStatus || '')}`}>
                  {member.maritalStatus?.toUpperCase() || '-'}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs pb-1">Pendidikan</p>
                <p className={`font-medium text-xs px-2 py-1 rounded ${getBadgeColor('education', member.lastEducation || '')}`}>
                  {member.lastEducation?.toUpperCase() || '-'}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs pb-1">Jaminan Sosial</p>
                <p className={`font-medium text-xs px-2 py-1 rounded ${member.socialSecurityType && member.socialSecurityType !== 'NONE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {member.socialSecurityType && member.socialSecurityType !== 'NONE' ? 'MEMILIKI' : 'TIDAK MEMILIKI'}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs pb-1">Bantuan Sosial</p>
                <p className={`font-medium text-xs px-2 py-1 rounded ${
                  member.receivesSocialAssistance === null 
                    ? 'bg-gray-100 text-gray-800' 
                    : member.receivesSocialAssistance 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  {member.receivesSocialAssistance === null ? '-' : member.receivesSocialAssistance ? 'MENERIMA' : 'TIDAK MENERIMA'}
                </p>
              </div>
            </div>

            {/* footer info when collapsed */}
            <div className="border-t border-slate-200 pt-2 mt-3 bg-gray-50 -mx-6 -mb-6 px-6 pb-4 rounded-b-xl">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={12} />
                  <p className="text-xs">
                    Terdaftar pada: {formatDateTime(member.createdAt, mounted)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={12} />
                  <p className="text-xs">
                    Diperbarui pada: {formatDateTime(member.updatedAt, mounted)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* expanded content */}
        {isExpanded && (
          <>
            {/* basic info grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <InfoCard icon={User} title="Informasi Pribadi" color="text-gray-600">
                <BasicInfo member={member} mounted={mounted} />
              </InfoCard>
              <InfoCard icon={Phone} title="Kontak & Status" color="text-gray-600">
                <ContactInfo member={member} />
              </InfoCard>
            </div>

            {/* sections w/ icons */}
            <div className="space-y-6">
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

              <MemberSection title="Informasi Jaminan Sosial" icon={Shield}> {/* Renamed */}
                <SocialSecurityData member={member} /> {/* Renamed */}
              </MemberSection>

              <MemberSection title="Data Kesehatan" icon={Heart}>
                <HealthData member={member} />
              </MemberSection>

              <MemberSection title="Penyandang Disabilitas" icon={Accessibility}>
                <DisabilityData member={member} />
              </MemberSection>
              
              <MemberSection title="Pengalaman Diskriminasi" icon={AlertTriangle}>
                <DiscriminationData member={member} />
              </MemberSection>

              <MemberSection title="Bantuan Sosial & Komunitas" icon={Users2}>
                <SocialAssistanceData member={member} />
              </MemberSection>
            </div>

            {/* footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-gray-50 -mx-8 -mb-8 px-8 pb-8 rounded-b-xl">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={14} />
                  <p className="text-xs">
                    Terdaftar pada: {formatDateTime(member.createdAt, mounted)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={14} />
                  <p className="text-xs">
                    Diperbarui pada: {formatDateTime(member.updatedAt, mounted)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* delete modal */}
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

      {/* click outside to close actions */}
      {showActions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowActions(false)}
        />
      )}
    </>
  );
}

// info card wrapper
function InfoCard({ icon: Icon, title, color, children }: { 
  icon: LucideIcon; 
  title: string; 
  color: string; 
  children: React.ReactNode; 
}) {
  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Icon size={16} className={color} />
        <h4 className="text-lg font-semibold text-slate-700">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function DataField({ label, value, className = "" }: { label: string; value: string | number | null | undefined; className?: string }) {
  return (
    <div className={`mb-2 ${className}`}>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm text-slate-800 font-medium">{value || '-'}</p>
    </div>
  );
}

function BooleanField({ label, value, className = "" }: { label: string; value: boolean | null | undefined; className?: string }) {
  return (
    <div className={`mb-2 ${className}`}>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-sm font-medium px-2 py-0.5 rounded inline-block ${
        value === null || value === undefined 
          ? 'bg-slate-100 text-slate-600' 
          : value 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
      }`}>
        {formatDisplayValue(value)}
      </p>
    </div>
  );
}

function FileLink({ label, url }: { label: string; url: string | null | undefined }) {
  if (!url) {
    return (
      <div className="mb-2">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm text-slate-400 italic">Tidak ada file</p>
      </div>
    );
  }
  return (
    <div className="mb-2">
      <p className="text-xs text-slate-500">{label}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.fileLink}>
        <FileText size={14} /> Lihat File
      </a>
    </div>
  );
}

function BasicInfo({ member, mounted }: { member: CommunityMember, mounted: boolean }) {
  return (
    <>
      <DataField label="Nama Panggilan Komunitas" value={member.communityNickname} />
      <DataField label="Tempat Lahir" value={member.placeOfBirth} />
      <DataField label="Tanggal Lahir" value={formatDate(member.dateOfBirth, mounted)} />
      <DataField label="Usia" value={member.age?.toString()} />
      <DataField label="Jenis Kelamin" value={member.gender?.replace(/_/g, ' ')} />
      <DataField label="Identitas Gender" value={member.genderIdentity?.replace(/_/g, ' ')} />
    </>
  );
}

function ContactInfo({ member }: { member: CommunityMember }) {
  return (
    <>
      <DataField label="Nomor Telepon" value={member.phoneNumber} />
    </>
  );
}

function PopulationData({ member }: { member: CommunityMember }) {
  return (
    <>
      <DataField label="NIK" value={member.nik} />
      <DataField label="Nomor KK" value={member.familyCardNumber} />
      <DataField label="Status E-KTP" value={member.ektpStatus?.replace(/_/g, ' ')} />
      <FileLink label="Pindaian KTP" url={member.idScanUrl} />
    </>
  );
}

function AddressData({ member }: { member: CommunityMember }) {
  return (
    <>
      <DataField label="Alamat Lengkap" value={member.address} />
      <DataField label="Kelurahan Domisili" value={member.domicileKelurahan} />
      <DataField label="Kecamatan Domisili" value={member.domicileKecamatan} />
      <DataField label="Kab/Kota Domisili" value={member.domicileRegencyCity} />
      <DataField label="Kota" value={member.city} />
      <DataField label="Status Kependudukan" value={member.residencyStatus?.replace(/_/g, ' ')} />
      <DataField label="Status Tempat Tinggal" value={member.livingSituation?.replace(/_/g, ' ')} />
    </>
  );
}

function SocialEconomicData({ member }: { member: CommunityMember }) {
  return (
    <>
      <DataField label="Status Perkawinan" value={member.maritalStatus?.replace(/_/g, ' ')} />
      <DataField label="Pendidikan Terakhir" value={member.lastEducation?.replace(/_/g, ' ')} />
      <BooleanField label="Masih Sekolah/Kuliah" value={member.isStillStudying} />
      <DataField label="Status Pekerjaan" value={member.employmentStatus?.replace(/_/g, ' ')} />
      {member.employmentStatus === "BEKERJA" && <DataField label="Jenis Pekerjaan" value={member.jobDescription} />}
      <DataField label="Pendapatan Bulanan" value={member.monthlyIncome ? `Rp ${member.monthlyIncome}` : '-'} />
      <BooleanField label="Memiliki Usaha Sendiri" value={member.hasOwnBusiness} />
      {member.hasOwnBusiness && <DataField label="Detail Usaha" value={member.businessDetails} />}
    </>
  );
}

function TrainingData({ member }: { member: CommunityMember }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div>
          <div className={`${styles.text} flex flex-col sm:flex-row sm:justify-between gap-1`}>
            <span className="font-medium text-slate-700 text-sm">Pelatihan Keterampilan:</span>
            <span className={`text-sm font-medium px-2 py-0.5 rounded ${
              member.hasReceivedSkillTraining === null 
                ? 'bg-slate-100 text-slate-600' 
                : member.hasReceivedSkillTraining 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-amber-100 text-amber-800'
            }`}>
              {formatDisplayValue(member.hasReceivedSkillTraining)}
            </span>
          </div>
          <DataField label="Jenis Pelatihan Diikuti" value={member.skillTrainingTypes?.length ? member.skillTrainingTypes.join(', ') : '-'} />
          {member.skillTrainingTypes && member.skillTrainingTypes.length > 0 && 
            <div className="mt-1 flex flex-wrap gap-1">
              {member.skillTrainingTypes.map((training, index) => (
                <div key={index} className="px-2 py-1 bg-indigo-50 border border-indigo-100 rounded text-xs text-indigo-700 inline-block">
                  <Award size={12} className="inline mr-1" />{training}
                </div>
              ))}
            </div>
          }
        </div>
        <div>
          <DataField label="Penyelenggara Pelatihan" value={member.trainingOrganizers?.length ? member.trainingOrganizers.join(', ') : '-'} />
          {member.trainingOrganizers && member.trainingOrganizers.length > 0 &&
            <div className="mt-1 flex flex-wrap gap-1">
              {member.trainingOrganizers.map((organizer, index) => (
                <div key={index} className="px-2 py-1 bg-purple-50 border border-purple-100 rounded text-xs text-purple-700 inline-block">
                  <Building size={12} className="inline mr-1" />{organizer}
                </div>
              ))}
            </div>
          }
          <DataField label="Pelatihan Diinginkan" value={member.desiredSkillTrainings?.length ? member.desiredSkillTrainings.join(', ') : '-'} />
          {member.desiredSkillTrainings && member.desiredSkillTrainings.length > 0 && 
            <div className="mt-1 flex flex-wrap gap-1">
              {member.desiredSkillTrainings.map((training, index) => (
                <div key={index} className="px-2 py-1 bg-violet-50 border border-violet-100 rounded text-xs text-violet-700 inline-block">
                  {training}
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </>
  );
}

// Enhance the function components for sections with vibrant colors

function SocialSecurityData({ member }: { member: CommunityMember }) { // Renamed from BpjsData
  const socialSecurityTypeDisplay: Record<string, string> = {
    [SocialSecurityType.NONE]: 'Tidak Memiliki',
    [SocialSecurityType.BPJS_KESEHATAN]: 'BPJS Kesehatan',
    [SocialSecurityType.BPJS_TK]: 'BPJS-TK',
    [SocialSecurityType.OTHER]: 'Lainnya',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div className="space-y-3">
        <DataField label="Jenis Jaminan Sosial" value={member.socialSecurityType ? socialSecurityTypeDisplay[member.socialSecurityType] : '-'} />
        {member.socialSecurityType === SocialSecurityType.OTHER && (
          <DataField label="Nama Jaminan Lainnya" value={member.socialSecurityOther} />
        )}
        {(member.socialSecurityType && member.socialSecurityType !== SocialSecurityType.NONE) && (
          <DataField label="ID Jaminan Sosial" value={member.socialSecurityId} />
        )}
      </div>
      <div>
        {(member.socialSecurityType && member.socialSecurityType !== SocialSecurityType.NONE) && 
          <div className="flex items-center gap-2">
            <FileLink label="Pindaian Kartu Jaminan" url={member.socialSecurityScanUrl} />
            {member.socialSecurityScanUrl && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>}
          </div>
        }
      </div>
    </div>
  );
}

function HealthData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <DataField label="Akses Layanan Kesehatan" value={member.healthServiceAccess?.replace(/_/g, ' ')} />
      <DataField label="Penyakit Kronis" value={member.chronicIllness} />
    </div>
  );
}

function DisabilityData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <BooleanField label="Penyandang Disabilitas" value={member.isPersonWithDisability} />
        {member.isPersonWithDisability && member.disabilityTypes && member.disabilityTypes.length > 0 && (
          <>
            <DataField label="Jenis Disabilitas" value={member.disabilityTypes.join(', ').replace(/_/g, ' ')} />
            <div className="mt-1 flex flex-wrap gap-1">
              {member.disabilityTypes.map(type => (
                <span key={type} className="px-2 py-0.5 bg-sky-100 text-sky-800 border border-sky-200 rounded text-xs">
                  {type.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </>
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


function DiscriminationData({ member }: { member: CommunityMember }) {
  const hasExperience = member.discriminationExperience === "PERNAH_MENGALAMI";
  const discriminationExperienceDisplay = member.discriminationExperience?.replace(/_/g, ' ') || '-';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <DataField label="Pengalaman Diskriminasi" value={discriminationExperienceDisplay} />
        {hasExperience && <div className="mb-2 mt-1 px-2 py-1 bg-orange-50 border border-orange-100 rounded text-xs text-orange-700 inline-block">
          {discriminationExperienceDisplay}
        </div>}
        
        {hasExperience && member.discriminationTypes && member.discriminationTypes.length > 0 && (
          <>
            <DataField label="Jenis Diskriminasi" value={member.discriminationTypes.join(', ').replace(/_/g, ' ')} />
            <div className="mt-1 flex flex-wrap gap-1">
              {member.discriminationTypes.map(type => (
                <span key={type} className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded text-xs">
                  {type.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </>
        )}
        {hasExperience && member.discriminationPerpetrators && member.discriminationPerpetrators.length > 0 && (
           <>
            <DataField label="Pelaku" value={member.discriminationPerpetrators.join(', ').replace(/_/g, ' ')} />
            <div className="mt-1 flex flex-wrap gap-1">
              {member.discriminationPerpetrators.map(type => (
                <span key={type} className="px-2 py-0.5 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded text-xs">
                  {type.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </>
        )}
        {hasExperience && member.discriminationPerpetrators?.includes(DiscriminationPerpetrator.OTHER) && (
          <DataField label="Pelaku Lainnya" value={member.discriminationPerpetratorOther} />
        )}
      </div>
      <div>
        <DataField label="Lokasi" value={member.discriminationLocation} />
        <BooleanField label="Dilaporkan" value={member.wasDiscriminationReported} />
        {member.wasDiscriminationReported === true && 
          <div className="mt-1 text-xs text-emerald-600 font-medium">Kasus telah dilaporkan</div>
        }
        {member.wasDiscriminationReported === false && hasExperience && 
          <div className="mt-1 text-xs text-orange-600 font-medium">Kasus belum dilaporkan</div>
        }
      </div>
    </div>
  );
}

function SocialAssistanceData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <div className={`${styles.text} flex flex-col sm:flex-row sm:justify-between gap-1`}>
          <span className="font-medium text-slate-700 text-sm">Menerima Bantuan Sosial:</span>
          <span className={`text-sm font-medium px-2 py-0.5 rounded ${
            member.receivesSocialAssistance === null || member.receivesSocialAssistance === undefined
              ? 'bg-slate-100 text-slate-600' 
              : member.receivesSocialAssistance 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-amber-100 text-amber-800'
          }`}>
            {formatDisplayValue(member.receivesSocialAssistance)}
          </span>
        </div>
        <DataField label="Kelompok Komunitas" value={member.communityGroup} />
      </div>
      <div>
        <div className={`${styles.text} flex flex-col sm:flex-row sm:justify-between gap-1`}>
          <span className="font-medium text-slate-700 text-sm">Terdaftar DTKS:</span>
          <span className={`text-sm font-medium px-2 py-0.5 rounded ${
            member.isRegisteredInDTKS === null  || member.isRegisteredInDTKS === undefined
              ? 'bg-slate-100 text-slate-600' 
              : member.isRegisteredInDTKS 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-amber-100 text-amber-800'
          }`}>
            {formatDisplayValue(member.isRegisteredInDTKS)}
          </span>
        </div>
        {member.otherSocialAssistance && member.otherSocialAssistance.length > 0 && (
          <div className="mt-2">
            <DataField label="Bantuan Sosial Lainnya" value={member.otherSocialAssistance.join(', ')} />
            <div className="mt-1 flex flex-wrap gap-1">
              {member.otherSocialAssistance.map((item, index) => (
                <span key={index} className="px-2 py-0.5 bg-teal-100 text-teal-800 border border-teal-200 rounded text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

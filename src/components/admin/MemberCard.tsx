'use client';

import { CommunityMember } from '../../../prisma/app/generated/prisma';
import { MemberSection } from './MemberSection';
import { useState } from 'react';
import {
  User, Phone, MapPin, Users,
  IdCard, TrendingUp, Award, Shield, Heart,
  AlertTriangle, HandHeart, Calendar, ExternalLink,
  ChevronDown, ChevronUp, Briefcase, BookOpen
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MemberCardProps {
  member: CommunityMember;
  index: number;
  currentPage: number;
  pageSize: number;
}

const styles = {
  card: "bg-white shadow-lg rounded-xl p-6 mb-6 w-full border border-slate-200 hover:shadow-xl transition-all duration-300 hover:border-indigo-200",
  expandedCard: "bg-white shadow-lg rounded-xl p-8 mb-8 w-full border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:border-indigo-300",
  heading: "text-xl font-bold text-slate-800 mb-2",
  expandedHeading: "text-2xl font-bold text-slate-800 mb-4",
  text: "text-slate-600 mb-3",
  fileLink: "text-sky-600 hover:text-sky-800 underline font-medium inline-flex items-center gap-1",
  iconBox: "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm",
  badge: "bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md",
  toggleBtn: "flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors duration-200 font-medium text-sm",
  statBadge: "px-2 py-1 rounded-md text-xs font-medium",
};

export function MemberCard({ member, index, currentPage, pageSize }: MemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const memberNumber = (currentPage - 1) * pageSize + index + 1;
  const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim();

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'communityGroup': 
        return member.communityGroup?.includes('Transgender') 
          ? 'bg-pink-100 text-pink-800'
          : member.communityGroup?.includes('Gay') 
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800';
      case 'education':
        return member.isStillStudying 
          ? 'bg-cyan-100 text-cyan-800'
          : 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className={isExpanded ? styles.expandedCard : styles.card}>
      {/* header w/ accent */}
      <div className={`relative ${isExpanded ? 'mb-6' : 'mb-4'}`}>
        {isExpanded ? (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500 rounded-t-xl"></div>
        ) : (
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400 rounded-t-xl opacity-70"></div>
        )}
        <div className={`flex justify-between items-start ${isExpanded ? 'pt-4' : 'pt-3'}`}>
          <div className="flex items-center gap-3">
            <div className={`${styles.iconBox} bg-indigo-500`}>
              <User size={18} />
            </div>
            <div>
              <h3 className={isExpanded ? styles.expandedHeading : styles.heading}>{fullName}</h3>
              {member.communityNickname && (
                <p className="text-indigo-600 text-sm font-medium">&quot;{member.communityNickname}&quot;</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={styles.badge}>
              #{memberNumber}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.toggleBtn}
            >
              {isExpanded ? 'Tutup' : 'Detail'}
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* basic preview when collapsed */}
      {!isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-indigo-500" />
              <span className="text-slate-700">{member.phoneNumber || '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-indigo-500" />
              <span className="text-slate-700">{member.domicileRegencyCity || '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-indigo-500" />
              <span className="text-slate-700">{member.communityGroup || '-'}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {member.communityGroup && (
              <span className={`${styles.statBadge} ${getBadgeColor('communityGroup')}`}>
                {member.communityGroup}
              </span>
            )}
            {member.employmentStatus && (
              <span className={`${styles.statBadge} ${getBadgeColor('employment')}`}>
                <Briefcase size={12} className="inline mr-1" />
                {member.employmentStatus}
              </span>
            )}
            {member.isStillStudying != null && (
              <span className={`${styles.statBadge} ${getBadgeColor('education')}`}>
                <BookOpen size={12} className="inline mr-1" />
                {member.isStillStudying ? 'Masih Bersekolah' : 'Tidak Bersekolah'}
              </span>
            )}
            {member.age && (
              <span className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs font-medium">
                {member.age} Tahun
              </span>
            )}
            {member.gender && (
              <span className="px-2 py-1 rounded-md bg-violet-100 text-violet-800 text-xs font-medium">
                {member.gender}
              </span>
            )}
          </div>
          
          <div className="border-t border-slate-200 pt-3 mt-3 text-sm grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <p className="text-slate-500 text-xs">Status Perkawinan</p>
              <p className="font-medium text-slate-700">{member.maritalStatus || '-'}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Pendidikan</p>
              <p className="font-medium text-slate-700">{member.lastEducation || '-'}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Status BPJS</p>
              <p className={`font-medium ${member.hasBpjs ? 'text-green-600' : 'text-red-500'}`}>
                {member.hasBpjs ? 'Memiliki' : 'Tidak Memiliki'}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Bantuan Sosial</p>
              <p className={`font-medium ${member.receivesSocialAssistance ? 'text-green-600' : 'text-slate-600'}`}>
                {member.receivesSocialAssistance === null ? '-' : member.receivesSocialAssistance ? 'Menerima' : 'Tidak Menerima'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* expanded content */}
      {isExpanded && (
        <>
          {/* basic info grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <InfoCard icon={User} title="Informasi Pribadi" color="bg-indigo-500">
              <BasicInfo member={member} />
            </InfoCard>
            <InfoCard icon={Phone} title="Kontak & Status" color="bg-violet-500">
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
          <div className="mt-8 pt-6 border-t border-slate-200 bg-indigo-50 -mx-8 -mb-8 px-8 pb-8 rounded-b-xl">
            <div className="flex items-center gap-2 text-indigo-500">
              <Calendar size={14} />
              <p className="text-xs">
                Terdaftar pada: {new Date(member.createdAt).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
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
        <div className={`${styles.iconBox} ${color}`}>
          <Icon size={16} />
        </div>
        <h4 className="text-lg font-semibold text-slate-700">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function DataField({ label, value, className = "" }: { label: string; value: string | null | undefined; className?: string }) {
  return (
    <div className={`${styles.text} ${className} flex flex-col sm:flex-row sm:justify-between gap-1`}>
      <span className="font-medium text-slate-700 text-sm">{label}:</span>
      <span className="text-slate-600 text-sm">{value || '-'}</span>
    </div>
  );
}

function BooleanField({ label, value, className = "" }: { label: string; value: boolean | null; className?: string }) {
  const displayValue = value === null ? '-' : value ? 'Ya' : 'Tidak';
  const colorClass = value === true ? 'text-green-600' : value === false ? 'text-red-500' : 'text-slate-600';
  
  return (
    <div className={`${styles.text} ${className} flex flex-col sm:flex-row sm:justify-between gap-1`}>
      <span className="font-medium text-slate-700 text-sm">{label}:</span>
      <span className={`text-sm font-medium ${colorClass}`}>{displayValue}</span>
    </div>
  );
}

function FileLink({ label, url }: { label: string; url: string | null }) {
  if (!url) return null;
  return (
    <div className={`${styles.text} flex flex-col sm:flex-row sm:justify-between gap-1`}>
      <span className="font-medium text-slate-700 text-sm">{label}:</span>
      <a href={url} target="_blank" rel="noopener noreferrer" className={`${styles.fileLink} text-sm`}>
        Lihat File <ExternalLink size={12} />
      </a>
    </div>
  );
}

function BasicInfo({ member }: { member: CommunityMember }) {
  return (
    <div>
      <DataField label="Nama Panggilan Komunitas" value={member.communityNickname} />
      <DataField 
        label="Tempat, Tanggal Lahir" 
        value={`${member.placeOfBirth || '-'}, ${member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString('id-ID') : '-'}`} 
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
      <DataField label="Kontak" value={member.phoneNumber} />
      <DataField label="Status Perkawinan" value={member.maritalStatus} />
      <DataField label="Pendidikan Terakhir" value={member.lastEducation} />
      <DataField label="Status Pekerjaan" value={member.employmentStatus} />
      <DataField label="Kelompok Komunitas" value={member.communityGroup} />
    </div>
  );
}

function PopulationData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <DataField label="NIK" value={member.nik} />
        <DataField label="No. KK" value={member.familyCardNumber} />
        <DataField label="Status E-KTP" value={member.ektpStatus} />
        {member.ektpStatus && 
          <div className="mt-1 px-2 py-1 bg-purple-50 border border-purple-100 rounded text-xs text-purple-700 inline-block">
            {member.ektpStatus}
          </div>
        }
      </div>
      <div>
        <FileLink label="Pindaian KTP" url={member.idScanUrl} />
        {member.idScanUrl && 
          <div className="mt-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-md text-xs text-blue-700 inline-flex items-center">
            <IdCard className="mr-1.5 text-blue-500" size={14} />
            Dokumen tersedia
          </div>
        }
      </div>
    </div>
  );
}

function AddressData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <DataField label="Alamat Lengkap" value={member.address} />
        <DataField label="Kelurahan" value={member.domicileKelurahan} />
        <DataField label="Kecamatan" value={member.domicileKecamatan} />
      </div>
      <div>
        <DataField label="Kabupaten/Kota" value={member.domicileRegencyCity} />
        <DataField label="Status Kependudukan" value={member.residencyStatus} />
        <DataField label="Status Tempat Tinggal" value={member.livingSituation} />
        {member.livingSituation && 
          <div className="mt-1 px-2 py-1 bg-teal-50 border border-teal-100 rounded text-xs text-teal-700 inline-block">
            {member.livingSituation}
          </div>
        }
      </div>
    </div>
  );
}

function SocialEconomicData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <div className={`${styles.text} flex flex-col sm:flex-row sm:justify-between gap-1`}>
          <span className="font-medium text-slate-700 text-sm">Masih Sekolah/Kuliah:</span>
          <span className={`text-sm font-medium px-2 py-0.5 rounded ${
            member.isStillStudying === null 
              ? 'bg-slate-100 text-slate-600' 
              : member.isStillStudying 
                ? 'bg-cyan-100 text-cyan-800' 
                : 'bg-amber-100 text-amber-800'
          }`}>
            {member.isStillStudying === null ? '-' : member.isStillStudying ? 'Ya' : 'Tidak'}
          </span>
        </div>
        <DataField label="Pendapatan Bulanan" value={member.monthlyIncome ? `Rp ${member.monthlyIncome}` : null} />
        {member.monthlyIncome && 
          <div className="mt-1 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded text-xs text-emerald-700 inline-block">
            Rp {member.monthlyIncome}
          </div>
        }
      </div>
      <div>
        <div className={`${styles.text} flex flex-col sm:flex-row sm:justify-between gap-1`}>
          <span className="font-medium text-slate-700 text-sm">Kepemilikan Usaha:</span>
          <span className={`text-sm font-medium px-2 py-0.5 rounded ${
            member.hasOwnBusiness === null 
              ? 'bg-slate-100 text-slate-600' 
              : member.hasOwnBusiness 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-slate-100 text-slate-700'
          }`}>
            {member.hasOwnBusiness === null ? '-' : member.hasOwnBusiness ? 'Ya' : 'Tidak'}
          </span>
        </div>
      </div>
    </div>
  );
}

function TrainingData({ member }: { member: CommunityMember }) {
  return (
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
            {member.hasReceivedSkillTraining === null ? '-' : member.hasReceivedSkillTraining ? 'Ya' : 'Tidak'}
          </span>
        </div>
        <DataField label="Jenis Pelatihan Diikuti" value={member.skillTrainingType} />
        {member.skillTrainingType && 
          <div className="mt-1 px-2 py-1 bg-indigo-50 border border-indigo-100 rounded text-xs text-indigo-700 inline-block">
            {member.skillTrainingType}
          </div>
        }
      </div>
      <div>
        <DataField label="Pelatihan Diinginkan" value={member.desiredSkillTraining} />
        {member.desiredSkillTraining && 
          <div className="mt-1 px-2 py-1 bg-violet-50 border border-violet-100 rounded text-xs text-violet-700 inline-block">
            {member.desiredSkillTraining}
          </div>
        }
      </div>
    </div>
  );
}

// Enhance the function components for sections with vibrant colors

function BpjsData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div className="space-y-3">
        <div className={`${styles.text} flex flex-col sm:flex-row sm:justify-between gap-1`}>
          <span className="font-medium text-slate-700 text-sm">Memiliki BPJS:</span>
          <span className={`text-sm font-medium px-2 py-0.5 rounded ${member.hasBpjs ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
            {member.hasBpjs ? 'Ya' : 'Tidak'}
          </span>
        </div>
        {member.hasBpjs && <DataField label="ID BPJS" value={member.bpjsId} />}
      </div>
      <div>
        {member.hasBpjs && 
          <div className="flex items-center gap-2">
            <FileLink label="Pindaian BPJS" url={member.bpjsScanUrl} />
            {member.bpjsScanUrl && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
          </div>
        }
      </div>
    </div>
  );
}

function HealthData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <DataField label="Akses Layanan Kesehatan" value={member.healthServiceAccess} />
        {member.healthServiceAccess && 
          <div className="mt-1 px-2 py-1 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700 inline-block">
            {member.healthServiceAccess}
          </div>
        }
      </div>
      <div>
        <DataField label="Penyakit Kronis" value={member.chronicIllness} />
        {member.chronicIllness && 
          <div className="mt-1 px-2 py-1 bg-amber-50 border border-amber-100 rounded text-xs text-amber-700 inline-block">
            {member.chronicIllness}
          </div>
        }
      </div>
    </div>
  );
}

function DiscriminationData({ member }: { member: CommunityMember }) {
  const hasExperience = !!member.discriminationExperience;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <DataField label="Pengalaman Diskriminasi" value={member.discriminationExperience} />
        {hasExperience && <div className="mb-2 mt-1 px-2 py-1 bg-orange-50 border border-orange-100 rounded text-xs text-orange-700 inline-block">
          {member.discriminationExperience}
        </div>}
        
        <DataField label="Jenis Diskriminasi" value={member.discriminationType} />
        <DataField label="Pelaku" value={member.discriminationPerpetrator} />
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
            member.receivesSocialAssistance === null 
              ? 'bg-slate-100 text-slate-600' 
              : member.receivesSocialAssistance 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'
          }`}>
            {member.receivesSocialAssistance === null ? '-' : member.receivesSocialAssistance ? 'Ya' : 'Tidak'}
          </span>
        </div>
      </div>
      <div>
        <div className={`${styles.text} flex flex-col sm:flex-row sm:justify-between gap-1`}>
          <span className="font-medium text-slate-700 text-sm">Terdaftar DTKS:</span>
          <span className={`text-sm font-medium px-2 py-0.5 rounded ${
            member.isRegisteredInDTKS === null 
              ? 'bg-slate-100 text-slate-600' 
              : member.isRegisteredInDTKS 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-amber-100 text-amber-800'
          }`}>
            {member.isRegisteredInDTKS === null ? '-' : member.isRegisteredInDTKS ? 'Ya' : 'Tidak'}
          </span>
        </div>
      </div>
    </div>
  );
}

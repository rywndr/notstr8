import { CommunityMember } from '../../../prisma/app/generated/prisma';
import { MemberSection } from './MemberSection';

interface MemberCardProps {
  member: CommunityMember;
  index: number;
  currentPage: number;
  pageSize: number;
}

const styles = {
  card: "bg-white shadow-lg rounded-lg p-6 mb-6 w-full border border-slate-200 hover:shadow-xl transition-shadow duration-300",
  heading: "text-xl font-semibold text-slate-800 mb-3",
  text: "text-slate-600 mb-2",
  fileLink: "text-sky-600 hover:text-sky-800 underline font-medium",
};

export function MemberCard({ member, index, currentPage, pageSize }: MemberCardProps) {
  const memberNumber = (currentPage - 1) * pageSize + index + 1;
  const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim();

  return (
    <div className={styles.card}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={styles.heading}>{fullName}</h3>
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
          #{memberNumber}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <BasicInfo member={member} />
        <ContactInfo member={member} />
      </div>

      <MemberSection title="Data Kependudukan">
        <PopulationData member={member} />
      </MemberSection>

      <MemberSection title="Alamat Domisili">
        <AddressData member={member} />
      </MemberSection>

      <MemberSection title="Status Sosial & Ekonomi">
        <SocialEconomicData member={member} />
      </MemberSection>

      <MemberSection title="Pelatihan">
        <TrainingData member={member} />
      </MemberSection>

      <MemberSection title="Informasi BPJS">
        <BpjsData member={member} />
      </MemberSection>

      <MemberSection title="Data Kesehatan">
        <HealthData member={member} />
      </MemberSection>

      <MemberSection title="Pengalaman Diskriminasi/Kekerasan">
        <DiscriminationData member={member} />
      </MemberSection>

      <MemberSection title="Bantuan Sosial & Komunitas">
        <SocialAssistanceData member={member} />
      </MemberSection>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-400">
          Terdaftar pada: {new Date(member.createdAt).toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}

function DataField({ label, value, className = "" }: { label: string; value: string | null | undefined; className?: string }) {
  return (
    <p className={`${styles.text} ${className}`}>
      <span className="font-semibold">{label}:</span> {value || '-'}
    </p>
  );
}

function BooleanField({ label, value, className = "" }: { label: string; value: boolean | null; className?: string }) {
  const displayValue = value === null ? '-' : value ? 'Ya' : 'Tidak';
  return (
    <p className={`${styles.text} ${className}`}>
      <span className="font-semibold">{label}:</span> {displayValue}
    </p>
  );
}

function FileLink({ label, url }: { label: string; url: string | null }) {
  if (!url) return null;
  return (
    <p className={styles.text}>
      <span className="font-semibold">{label}:</span>{' '}
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.fileLink}>
        Lihat File
      </a>
    </p>
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
      </div>
      <div>
        <FileLink label="Pindaian KTP" url={member.idScanUrl} />
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
      </div>
    </div>
  );
}

function SocialEconomicData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <BooleanField label="Masih Sekolah/Kuliah" value={member.isStillStudying} />
        <DataField label="Pendapatan Bulanan" value={member.monthlyIncome ? `Rp ${member.monthlyIncome}` : null} />
      </div>
      <div>
        <BooleanField label="Kepemilikan Usaha" value={member.hasOwnBusiness} />
      </div>
    </div>
  );
}

function TrainingData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <BooleanField label="Mendapatkan Pelatihan Keterampilan" value={member.hasReceivedSkillTraining} />
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <p className={styles.text}>
          <span className="font-semibold">Memiliki BPJS:</span>{' '}
          <span className={member.hasBpjs ? 'text-green-600 font-semibold' : 'text-red-600'}>
            {member.hasBpjs ? 'Ya' : 'Tidak'}
          </span>
        </p>
        {member.hasBpjs && <DataField label="ID BPJS" value={member.bpjsId} />}
      </div>
      <div>
        {member.hasBpjs && <FileLink label="Pindaian BPJS" url={member.bpjsScanUrl} />}
      </div>
    </div>
  );
}

function HealthData({ member }: { member: CommunityMember }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <p className={styles.text}>
          <span className="font-semibold">Menerima Bantuan Sosial:</span>{' '}
          <span className={member.receivesSocialAssistance ? 'text-green-600 font-semibold' : 'text-slate-600'}>
            {member.receivesSocialAssistance === null ? '-' : member.receivesSocialAssistance ? 'Ya' : 'Tidak'}
          </span>
        </p>
      </div>
      <div>
        <BooleanField label="Terdaftar DTKS" value={member.isRegisteredInDTKS} />
      </div>
    </div>
  );
}

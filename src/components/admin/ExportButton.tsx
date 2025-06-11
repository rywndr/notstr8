'use client';

import { useState } from 'react';
import { exportMembersToPDF } from '@/actions/pdf-export';
import { exportMembersToExcel } from '@/actions/excel-export';
import { CommunityMember } from '../../../prisma/app/generated/prisma';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: {
      head: string[][];
      body: (string | number)[][];
      startY: number;
      styles: { fontSize: number };
      headStyles: { fillColor: number[] };
      columnStyles?: Record<number, { cellWidth: number }>;
      pageBreak?: string;
    }) => void;
  }
}

interface ExportButtonProps {
  searchQuery?: string;
  bpjsStatus?: string;
  socialAssistanceStatus?: string;
  educationLevel?: string;
  employmentStatus?: string;
}

export function ExportButton({ 
  searchQuery, 
  bpjsStatus, 
  socialAssistanceStatus, 
  educationLevel, 
  employmentStatus 
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'excel' | null>(null);

  const formatAllMemberData = (member: CommunityMember, index: number): (string | number)[] => {
    const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim();
    
    return [
      index + 1,
      fullName,
      member.communityNickname || '-',
      member.age || '-',
      member.gender || '-',
      member.genderIdentity || '-',
      member.placeOfBirth || '-',
      member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString('id-ID') : '-',
      member.nik || '-',
      member.familyCardNumber || '-',
      member.ektpStatus || '-',
      member.phoneNumber || '-',
      member.address || '-',
      member.domicileKelurahan || '-',
      member.domicileKecamatan || '-',
      member.domicileRegencyCity || '-',
      member.city || '-',
      member.residencyStatus || '-',
      member.livingSituation || '-',
      member.maritalStatus || '-',
      member.lastEducation || '-',
      member.isStillStudying === null ? '-' : member.isStillStudying ? 'Ya' : 'Tidak',
      member.employmentStatus || '-',
      member.jobDescription || '-',
      member.monthlyIncome || '-',
      member.hasOwnBusiness === null ? '-' : member.hasOwnBusiness ? 'Ya' : 'Tidak',
      member.businessDetails || '-',
      member.hasReceivedSkillTraining === null ? '-' : member.hasReceivedSkillTraining ? 'Ya' : 'Tidak',
      member.skillTrainingType || '-',
      member.desiredSkillTraining || '-',
      member.hasBpjs ? 'Ya' : 'Tidak',
      member.bpjsId || '-',
      member.healthServiceAccess || '-',
      member.chronicIllness || '-',
      member.discriminationExperience || '-',
      member.discriminationType || '-',
      member.discriminationPerpetrator || '-',
      member.discriminationLocation || '-',
      member.wasDiscriminationReported === null ? '-' : member.wasDiscriminationReported ? 'Ya' : 'Tidak',
      member.receivesSocialAssistance === null ? '-' : member.receivesSocialAssistance ? 'Ya' : 'Tidak',
      member.isRegisteredInDTKS === null ? '-' : member.isRegisteredInDTKS ? 'Ya' : 'Tidak',
      member.communityGroup || '-',
      new Date(member.createdAt).toLocaleDateString('id-ID'),
      new Date(member.updatedAt).toLocaleDateString('id-ID')
    ];
  };

  const handlePDFExport = async () => {
    setIsExporting(true);
    setExportType('pdf');
    
    try {
      const jsPDF = (await import('jspdf')).default;
      await import('jspdf-autotable');
      
      const result = await exportMembersToPDF(
        searchQuery,
        bpjsStatus,
        socialAssistanceStatus,
        educationLevel,
        employmentStatus
      );

      if (result.error) {
        alert('Export failed: ' + result.error);
        return;
      }

      const doc = new jsPDF('l', 'mm', 'a4');
      
      doc.setFontSize(16);
      doc.text('Data Anggota Komunitas', 14, 20);
      
      doc.setFontSize(10);
      doc.text(`Tanggal Export: ${new Date().toLocaleDateString('id-ID')}`, 14, 26);
      doc.text(`Total Data: ${result.members?.length || 0}`, 14, 32);

      // Basic Information
      const basicData = result.members?.map((member: CommunityMember, index: number) => formatBasicInfo(member, index)) || [];
      doc.autoTable({
        head: [['No', 'Nama', 'Panggilan', 'Umur', 'Gender', 'Tempat Lahir', 'Tanggal Lahir', 'Telepon', 'Status Kawin']],
        body: basicData,
        startY: 40,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      doc.addPage();
      doc.setFontSize(14);
      doc.text('Data Alamat & Kependudukan', 14, 20);
      
      const addressData = result.members?.map((member: CommunityMember) => formatAddressInfo(member)) || [];
      doc.autoTable({
        head: [['Nama', 'NIK', 'No. KK', 'Alamat', 'Kelurahan', 'Kecamatan', 'Kab/Kota', 'Status Domisili', 'Tempat Tinggal']],
        body: addressData,
        startY: 30,
        styles: { fontSize: 7 },
        headStyles: { fillColor: [52, 152, 219] }
      });

      doc.addPage();
      doc.setFontSize(14);
      doc.text('Data Sosial & Ekonomi', 14, 20);
      
      const socialData = result.members?.map((member: CommunityMember) => formatSocialEconomic(member)) || [];
      doc.autoTable({
        head: [['Nama', 'Pendidikan', 'Masih Sekolah', 'Pekerjaan', 'Deskripsi Kerja', 'Pendapatan', 'Punya Usaha', 'Detail Usaha']],
        body: socialData,
        startY: 30,
        styles: { fontSize: 7 },
        headStyles: { fillColor: [155, 89, 182] }
      });

      doc.addPage();
      doc.setFontSize(14);
      doc.text('Data Kesehatan & Bantuan Sosial', 14, 20);
      
      const healthData = result.members?.map((member: CommunityMember) => formatHealthBpjs(member)) || [];
      doc.autoTable({
        head: [['Nama', 'BPJS', 'ID BPJS', 'Akses Kesehatan', 'Penyakit Kronis', 'Bansos', 'DTKS']],
        body: healthData,
        startY: 30,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [46, 204, 113] }
      });

      doc.save(`data-anggota-komunitas-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export gagal');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExcelExport = async () => {
    setIsExporting(true);
    setExportType('excel');
    
    try {
      const XLSX = await import('xlsx');
      
      const result = await exportMembersToExcel(
        searchQuery,
        bpjsStatus,
        socialAssistanceStatus,
        educationLevel,
        employmentStatus
      );

      if (result.error) {
        alert('Export failed: ' + result.error);
        return;
      }

      const workbook = XLSX.utils.book_new();

      // Informational Headers
      const exportDate = new Date().toLocaleDateString('id-ID');
      const totalData = result.members?.length || 0;

      const infoHeaders = [
        ['Data Anggota Komunitas'],
        [`Tanggal Export: ${exportDate}`],
        [`Total Data: ${totalData}`],
        []
      ];

      // Main Data Headers
      const mainHeaders = [
        'No', 'Nama Lengkap', 'Nama Panggilan', 'Umur', 'Gender', 'Identitas Gender', 'Tempat Lahir', 'Tanggal Lahir',
        'NIK', 'No. KK', 'Status E-KTP', 'Telepon', 'Alamat', 'Kelurahan', 'Kecamatan', 'Kab/Kota', 'Kota',
        'Status Domisili', 'Tempat Tinggal', 'Status Kawin', 'Pendidikan', 'Masih Sekolah', 'Pekerjaan',
        'Deskripsi Kerja', 'Pendapatan', 'Punya Usaha', 'Detail Usaha', 'Pelatihan Skill', 'Jenis Pelatihan',
        'Pelatihan Diinginkan', 'BPJS', 'ID BPJS', 'Akses Kesehatan', 'Penyakit Kronis', 'Pengalaman Diskriminasi',
        'Jenis Diskriminasi', 'Pelaku', 'Lokasi Diskriminasi', 'Dilaporkan', 'Bansos', 'DTKS', 'Komunitas',
        'Tanggal Daftar', 'Tanggal Update'
      ];
      
      const allDataRows = result.members?.map((member: CommunityMember, index: number) => formatAllMemberData(member, index)) || [];
      
      // Info headers, main headers, and data
      const sheetData = [
        ...infoHeaders,
        mainHeaders,
        ...allDataRows
      ];

      const completeSheet = XLSX.utils.aoa_to_sheet(sheetData);

      // Calc column widths
      const colWidths = mainHeaders.map((_, i) => ({
        wch: Math.max(
          // Check main header length
          (mainHeaders[i] || '').toString().length,
          // Check data cell lengths
          ...allDataRows.map(row => (row[i] || '').toString().length),
          // Check info header lengths if they span this column (only first column for these specific info headers)
          ...(i === 0 ? infoHeaders.map(row => (row[0] || '').toString().length) : []) 
        ) + 2 // smol padding
      }));
      
      if (infoHeaders.length > 0 && colWidths.length > 0) {
        const firstColInfoWidth = Math.max(...infoHeaders.map(row => (row[0] || '').toString().length));
        colWidths[0].wch = Math.max(colWidths[0].wch, firstColInfoWidth + 2);
      }

      completeSheet['!cols'] = colWidths;

      if (mainHeaders.length > 0) {
        completeSheet['!merges'] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: mainHeaders.length -1 } }
        ];
      }


      XLSX.utils.book_append_sheet(workbook, completeSheet, 'Data Lengkap');

      XLSX.writeFile(workbook, `data-anggota-komunitas-${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export gagal');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExport = async (type: string) => {
    if (type === 'pdf') {
      await handlePDFExport();
    } else if (type === 'excel') {
      await handleExcelExport();
    }
  };

  const formatBasicInfo = (member: CommunityMember, index: number): (string | number)[] => {
    const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim();
    return [
      index + 1,
      fullName,
      member.communityNickname || '-',
      member.age || '-',
      member.gender || '-',
      member.placeOfBirth || '-',
      member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString('id-ID') : '-',
      member.phoneNumber || '-',
      member.maritalStatus || '-'
    ];
  };

  const formatAddressInfo = (member: CommunityMember): (string | number)[] => {
    const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim();
    return [
      fullName,
      member.nik || '-',
      member.familyCardNumber || '-',
      member.address || '-',
      member.domicileKelurahan || '-',
      member.domicileKecamatan || '-',
      member.domicileRegencyCity || '-',
      member.residencyStatus || '-',
      member.livingSituation || '-'
    ];
  };

  const formatSocialEconomic = (member: CommunityMember): (string | number)[] => {
    const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim();
    return [
      fullName,
      member.lastEducation || '-',
      member.isStillStudying === null ? '-' : member.isStillStudying ? 'Ya' : 'Tidak',
      member.employmentStatus || '-',
      member.jobDescription || '-',
      member.monthlyIncome || '-',
      member.hasOwnBusiness === null ? '-' : member.hasOwnBusiness ? 'Ya' : 'Tidak',
      member.businessDetails || '-'
    ];
  };

  const formatHealthBpjs = (member: CommunityMember): (string | number)[] => {
    const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim();
    return [
      fullName,
      member.hasBpjs ? 'Ya' : 'Tidak',
      member.bpjsId || '-',
      member.healthServiceAccess || '-',
      member.chronicIllness || '-',
      member.receivesSocialAssistance === null ? '-' : member.receivesSocialAssistance ? 'Ya' : 'Tidak',
      member.isRegisteredInDTKS === null ? '-' : member.isRegisteredInDTKS ? 'Ya' : 'Tidak'
    ];
  };

  return (
    <div className="flex items-center gap-2">
      <select
        onChange={(e) => handleExport(e.target.value)}
        value=""
        disabled={isExporting}
        className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
      >
        <option value="" disabled>
          {isExporting 
            ? `Exporting ${exportType === 'pdf' ? 'PDF' : 'Excel'}...` 
            : 'Export Data'
          }
        </option>
        <option value="pdf">Export as PDF</option>
        <option value="excel">Export as Excel</option>
      </select>
    </div>
  );
}

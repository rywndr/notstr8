'use client';

import { CommunityMember } from '../../../prisma/app/generated/prisma';
import { MemberTableRow } from './MemberTableRow';

interface MemberTableProps {
  members: CommunityMember[];
  onDelete?: (id: string) => void;
  onEdit?: (member: CommunityMember) => void;
}

export function MemberTable({ members, onDelete, onEdit }: MemberTableProps) {
  if (!members || members.length === 0) {
    return <p className="text-center text-slate-500 py-8">Tidak ada data anggota untuk ditampilkan.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Nama Lengkap
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              NIK
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Telepon
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Kota
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Jaminan Sosial
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Tgl Daftar
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {members.map((member) => (
            <MemberTableRow key={member.id} member={member} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberTable;

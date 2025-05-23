import { getCommunityMembers } from '@/actions';
import { Users } from 'lucide-react';
import { MemberCard } from '@/components/admin/MemberCard';
import { EmptyState } from '@/components/admin/EmptyState';
import { AdminPagination } from '@/components/admin/AdminPagination';

export const dynamic = 'force-dynamic';

interface AdminPageProps {
  searchParams?: {
    page?: string;
    pageSize?: string;
  };
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;
  const { members, totalCount, overallTotalCount } = await getCommunityMembers(currentPage, pageSize);
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header totalMembers={overallTotalCount} />
        
        <section className="w-full">
          {members.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-8">
              {members.map((member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              ))}
            </div>
          )}
        </section>

        <AdminPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}

function Header({ totalMembers }: { totalMembers: number }) {
  return (
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

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-center"> 
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{totalMembers}</h3>
            <p className="text-slate-600">Total Anggota Terdaftar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

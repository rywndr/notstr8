import { getCommunityMembers } from '@/actions';
import { Users } from 'lucide-react';
import { MemberCard } from '@/components/admin/MemberCard';
import { EmptyState } from '@/components/admin/EmptyState';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { FilterControls } from '@/components/admin/FilterControls';
import { PageSizeSelector } from '@/components/admin/PageSizeSelector';

export const dynamic = 'force-dynamic';

interface AdminPageProps {
  searchParams?: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    bpjs?: string;
    social?: string;
    education?: string;
    employment?: string;
  }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  
  const currentPage = Number(params?.page) || 1;
  const pageSize = Number(params?.pageSize) || 10;
  const searchQuery = params?.search || '';
  const bpjsStatus = params?.bpjs || 'all';
  const socialAssistanceStatus = params?.social || 'all';
  const educationLevel = params?.education || 'all';
  const employmentStatus = params?.employment || 'all';

  const { members, totalCount, overallTotalCount } = await getCommunityMembers(
    currentPage, 
    pageSize,
    searchQuery,
    bpjsStatus,
    socialAssistanceStatus,
    educationLevel,
    employmentStatus
  );
  
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header totalMembers={overallTotalCount} filteredCount={totalCount} />
        
        <FilterControls 
          initialSearchQuery={searchQuery}
          initialBpjsStatus={bpjsStatus}
          initialSocialAssistanceStatus={socialAssistanceStatus}
          initialEducationLevel={educationLevel}
          initialEmploymentStatus={employmentStatus}
        />

        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-slate-600">
            Menampilkan {members.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalCount)} dari {totalCount} hasil
          </div>
          <PageSizeSelector currentPageSize={pageSize} />
        </div>
        
        <section className="w-full">
          {members.length === 0 ? (
            <EmptyState hasFilters={searchQuery !== '' || bpjsStatus !== 'all' || socialAssistanceStatus !== 'all' || educationLevel !== 'all' || employmentStatus !== 'all'} />
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

        {totalPages > 1 && (
          <AdminPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
}

function Header({ totalMembers, filteredCount }: { totalMembers: number; filteredCount: number }) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center"> 
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{totalMembers}</h3>
            <p className="text-slate-600">Total Anggota Terdaftar</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">{filteredCount}</h3>
            <p className="text-slate-600">Hasil Filter</p>
          </div>
        </div>
      </div>
    </div>
  );
}
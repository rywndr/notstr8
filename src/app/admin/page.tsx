import { getCommunityMembers } from '@/actions';
import { Users } from 'lucide-react';
import { MemberCard } from '@/components/admin/MemberCard';
import { EmptyState } from '@/components/admin/EmptyState';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { FilterControls } from '@/components/admin/FilterControls';
import { PageSizeSelector } from '@/components/admin/PageSizeSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3x3, Table } from 'lucide-react';
import { MemberTable } from '@/components/admin/MemberTable';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

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
  // Server-side auth check
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  // Redirect if not authenticated
  if (error || !user) {
    redirect('/login');
  }
  
  // Check if user is admin
  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  });
  
  if (!dbUser || dbUser.role !== 'ADMIN') {
    redirect('/access-denied');
  }

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

  const hasFilters = searchQuery !== '' || bpjsStatus !== 'all' || socialAssistanceStatus !== 'all' || educationLevel !== 'all' || employmentStatus !== 'all';

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header totalMembers={overallTotalCount} filteredCount={totalCount} hasFilters={hasFilters} />
        
        <FilterControls 
          initialSearchQuery={searchQuery}
          initialBpjsStatus={bpjsStatus}
          initialSocialAssistanceStatus={socialAssistanceStatus}
          initialEducationLevel={educationLevel}
          initialEmploymentStatus={employmentStatus}
        />

        <section className="w-full">
          {members.length === 0 ? (
            <EmptyState hasFilters={searchQuery !== '' || bpjsStatus !== 'all' || socialAssistanceStatus !== 'all' || educationLevel !== 'all' || employmentStatus !== 'all'} />
          ) : (
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-slate-600">
                  Menampilkan {members.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalCount)} dari {totalCount} hasil
                </div>
                <div className="flex items-center gap-4">
                  <TabsList>
                    <TabsTrigger value="grid" className="flex items-center gap-2 transition-all duration-300 ease-in-out data-[state=active]:scale-105 data-[state=active]:shadow-md">
                      <Grid3x3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Grid</span>
                    </TabsTrigger>
                    <TabsTrigger value="table" className="flex items-center gap-2 transition-all duration-300 ease-in-out data-[state=active]:scale-105 data-[state=active]:shadow-md">
                      <Table className="w-4 h-4" />
                      <span className="hidden sm:inline">Table</span>
                    </TabsTrigger>
                  </TabsList>
                  <PageSizeSelector currentPageSize={pageSize} />
                </div>
              </div>
              
              <TabsContent value="grid" className="transition-all duration-500 ease-in-out animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="space-y-8">
                  {members.map((member, index) => (
                    <div 
                      key={member.id}
                      className="animate-in fade-in-0 slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <MemberCard
                        member={member}
                        index={index}
                        currentPage={currentPage}
                        pageSize={pageSize}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="table" className="transition-all duration-500 ease-in-out animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                  <MemberTable members={members} />
                </div>
              </TabsContent>
            </Tabs>
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

function Header({ totalMembers, filteredCount, hasFilters }: { totalMembers: number; filteredCount: number; hasFilters: boolean }) {
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
        {hasFilters ? (
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
        ) : (
          <div className="text-center">
            <h3 className="text-3xl font-bold text-slate-800">{totalMembers}</h3>
            <p className="text-slate-600">Total Anggota Terdaftar</p>
          </div>
        )}
      </div>
    </div>
  );
}
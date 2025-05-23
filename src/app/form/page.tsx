import CommunityForm from '@/components/CommunityForm';
import { getCommunityMembers } from '@/actions';
import { CommunityMember } from '../../../prisma/app/generated/prisma';

export const dynamic = 'force-dynamic'; // Ensure data is fetched on every request

export default async function FormPage() {
  const members = await getCommunityMembers();

  const cardStyle = "bg-slate-50 shadow-lg rounded-lg p-6 mb-6 w-full max-w-2xl";
  const headingStyle = "text-xl font-semibold text-slate-700 mb-2";
  const textStyle = "text-slate-600";
  const fileLinkStyle = "text-sky-600 hover:text-sky-800 underline";

  return (
   <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Pendataan Komunitas</h1>
          <p className="text-lg text-slate-600">Silakan isi formulir di bawah ini untuk mendaftarkan data Anda.</p>
        </header>
        <CommunityForm />
      </div>
    </div>
  );
}
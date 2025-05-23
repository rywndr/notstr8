import CommunityForm from '@/components/CommunityForm';

export default async function FormPage() {
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
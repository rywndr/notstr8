import React from 'react';
import Link from 'next/link';
import { Users, HeartHandshake, ShieldCheck, ListChecks } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen text-slate-800">
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="mb-8">
            <HeartHandshake className="h-20 w-20 text-slate-700 mx-auto mb-6" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Pendataan Komunitas
            <span className="block bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent mt-2 pb-1.5">
              Waria Tanjungpinang
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
            Sebuah inisiatif untuk mendukung pendataan yang akurat dan pemahaman yang lebih baik demi kesejahteraan bersama komunitas waria di Kota Tanjungpinang.
          </p>
          <Link
            href="/form"
            className="inline-block bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Isi Formulir Sekarang
          </Link>
        </div>
      </section>

      {/* Tujuan */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <ListChecks className="h-16 w-16 text-slate-700 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Tujuan Utama Kami</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-slate-700">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Data Akurat & Terpusat</h3>
              <p className="text-slate-600 leading-relaxed">Mengumpulkan data yang valid dan komprehensif untuk pemetaan kebutuhan komunitas yang lebih baik.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Dasar Advokasi & Kebijakan</h3>
              <p className="text-slate-600 leading-relaxed">Menyediakan landasan data yang kuat untuk mendukung advokasi hak dan penyusunan kebijakan yang inklusif.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Program Pemberdayaan</h3>
              <p className="text-slate-600 leading-relaxed">Merancang dan mengimplementasikan program pemberdayaan yang tepat sasaran sesuai dengan kebutuhan riil komunitas.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Peningkatan Kesejahteraan</h3>
              <p className="text-slate-600 leading-relaxed">Berkontribusi pada peningkatan kualitas hidup dan kesejahteraan anggota komunitas secara menyeluruh.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Program */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <Users className="h-16 w-16 text-slate-700 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Tentang Program Ini</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Program pendataan ini bertujuan untuk mengumpulkan informasi yang valid dan komprehensif mengenai komunitas waria di Tanjungpinang. Data yang terkumpul akan digunakan secara bertanggung jawab untuk advokasi, perencanaan program pemberdayaan, dan peningkatan akses terhadap layanan yang dibutuhkan, demi mewujudkan masyarakat yang lebih inklusif dan suportif.
            </p>
          </div>
        </div>
      </section>

      {/* Komitmen */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <ShieldCheck className="h-16 w-16 text-slate-700 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Komitmen Kami</h2>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-slate-700">
            <p className="text-lg leading-relaxed mb-4">
              Kami memahami pentingnya privasi dan keamanan data Anda. Seluruh informasi yang dikumpulkan melalui program ini akan dijaga kerahasiaannya dan hanya akan digunakan untuk tujuan yang telah disebutkan.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
              <li>Data dianonimkan untuk laporan dan analisis umum.</li>
              <li>Akses ke data mentah sangat dibatasi dan diawasi.</li>
              <li>Tidak ada data pribadi yang akan dibagikan kepada pihak ketiga tanpa persetujuan eksplisit.</li>
              <li>Kami berkomitmen pada penggunaan data yang etis dan bertanggung jawab untuk kemajuan komunitas.</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Kolaborasi */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Didukung Oleh</h2>
          <div className="flex flex-col items-center mb-6">
            <img 
              src="/stti-logo.png"
              alt="Logo Sekolah Tinggi Teknologi Indonesia Tanjung Pinang"
              className="h-64 w-auto mb-4" 
            />
            <p className="text-xl text-slate-700 font-semibold">
              Sekolah Tinggi Teknologi Indonesia Tanjung Pinang
            </p>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed">
            Inisiatif ini merupakan bagian dari komitmen Sekolah Tinggi Teknologi Indonesia Tanjung Pinang dalam pengabdian kepada masyarakat dan penerapan ilmu pengetahuan untuk kemajuan sosial. Program ini juga merupakan wujud nyata dari <span className="font-semibold">Program Kreativitas Mahasiswa (PKM)</span> yang bertujuan untuk menumbuhkan inovasi dan kontribusi mahasiswa bagi masyarakat.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
import { CheckCircle2, Home, BarChart3, Edit3 } from 'lucide-react'
import Link from 'next/link'

export default function FormAlreadySubmitted() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-700 px-6 py-6">
            <div className="flex items-center text-white">
              <CheckCircle2 className="h-8 w-8 mr-4" />
              <div>
                <h1 className="text-xl font-semibold mb-1">
                  Formulir Berhasil Dikirim!
                </h1>
                <p className="text-slate-100 text-sm">
                  Data Anda telah tersimpan
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Status Card */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-slate-900 mb-1">
                    Status Formulir
                  </h3>
                  <p className="text-slate-700 text-sm mb-2">
                    Data Anda telah berhasil diterima dan disimpan dalam database.
                  </p>
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs font-medium">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                    Terverifikasi
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Card */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <Edit3 className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    Perlu Mengubah Data?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Anda dapat mengedit informasi yang telah dikirimkan.
                  </p>
                  <Link 
                    href="/form/edit"
                    className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Formulir
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">
                Langkah Selanjutnya
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  Anda akan dihubungi jika diperlukan informasi tambahan
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  Data akan ditambahkan ke database komunitas
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  Lihat statistik komunitas di dashboard
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/"
                  className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
                
                <Link 
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Terima kasih telah mengisi form kami! 🎉
          </p>
        </div>
      </div>
    </div>
  )
}

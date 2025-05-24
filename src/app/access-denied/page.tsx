import { Shield } from 'lucide-react'

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-red-50 px-8 py-6 border-b border-red-200">
            <div className="flex items-center">
              <Shield className="h-12 w-12 text-red-600 mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-red-800 mb-2">
                  Akses Terbatas
                </h1>
                <p className="text-red-700">
                  Anda tidak memiliki izin untuk mengakses halaman ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Kimlik doğrulama kontrolü
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true'
    if (!isAuthenticated) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminAuth')
              router.push('/admin/login')
            }}
            className="text-[#e20074] hover:underline"
          >
            Abmelden
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-4">Banken</h2>
            <p className="text-[#666] mb-4">Banken verwalten und Status ändern</p>
            <button
              onClick={() => router.push('/admin/banks')}
              className="bg-[#e20074] text-white px-4 py-2 rounded hover:bg-[#cb0068]"
            >
              Banken verwalten
            </button>
          </div>

          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-4">Formulare</h2>
            <p className="text-[#666] mb-4">Alle Formulareinreichungen anzeigen</p>
            <button
              onClick={() => router.push('/admin')}
              className="bg-[#e20074] text-white px-4 py-2 rounded hover:bg-[#cb0068]"
            >
              Formulare anzeigen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 
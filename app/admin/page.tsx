'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

interface FormSubmission {
  id: string
  full_name: string
  phone: string
  street_address: string
  zip_code: string
  city: string
  bank_id: string
  created_at: string
  bank: {
    name: string
  }
}

export default function AdminPage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])

  useEffect(() => {
    // Kimlik doğrulama kontrolü
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true'
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }
    fetchSubmissions()
  }, [router])

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('form_submissions')
      .select(`
        *,
        bank:banks(name)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching submissions:', error)
      return
    }
    if (data) setSubmissions(data)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Form Başvuruları</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-[#e20074] hover:underline"
            >
              Dashboard
            </button>
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
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad Soyad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adres
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posta Kodu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Şehir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Banka
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.street_address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.zip_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.bank?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(submission.created_at).toLocaleString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 
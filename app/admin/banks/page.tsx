'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

interface Bank {
  id: string
  name: string
  active: boolean
}

export default function BanksAdminPage() {
  const router = useRouter()
  const [banks, setBanks] = useState<Bank[]>([])
  const [newBankName, setNewBankName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // Kimlik doğrulama kontrolü
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true'
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }
    fetchBanks()
  }, [router])

  const fetchBanks = async () => {
    const { data, error } = await supabase.from('banks').select('*')
    if (error) {
      console.error('Error fetching banks:', error)
      return
    }
    if (data) setBanks(data)
  }

  const addBank = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!newBankName.trim()) {
      setError('Bank name cannot be empty')
      return
    }

    const { error } = await supabase
      .from('banks')
      .insert([{ name: newBankName }])

    if (error) {
      setError('Failed to add bank')
    } else {
      setSuccess('Bank added successfully')
      setNewBankName('')
      fetchBanks()
    }
  }

  const toggleBankStatus = async (bankId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('banks')
      .update({ active: !currentStatus })
      .eq('id', bankId)

    if (error) {
      setError('Failed to update bank status')
    } else {
      fetchBanks()
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Banken verwalten</h1>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="text-[#e20074] hover:underline"
          >
            Zurück zum Dashboard
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="bg-white p-6 rounded shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">Neue Bank hinzufügen</h2>
          <form onSubmit={addBank} className="flex gap-4">
            <input
              type="text"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              placeholder="Bank name"
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-[#e20074]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#e20074] text-white rounded hover:bg-[#cb0068]"
            >
              Hinzufügen
            </button>
          </form>
        </div>

        <div className="bg-white rounded shadow-sm">
          <h2 className="text-xl font-bold p-6 border-b">Bankliste</h2>
          <div className="divide-y">
            {banks.map((bank) => (
              <div
                key={bank.id}
                className="flex items-center justify-between p-6"
              >
                <div>
                  <span className="font-medium">{bank.name}</span>
                  <span className={`ml-3 px-2 py-1 text-xs rounded ${
                    bank.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {bank.active ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </div>
                <button
                  onClick={() => toggleBankStatus(bank.id, bank.active)}
                  className={`px-4 py-2 rounded text-white ${
                    bank.active 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {bank.active ? 'Deaktivieren' : 'Aktivieren'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
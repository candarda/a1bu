'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

interface Bank {
  id: string
  name: string
  active: boolean
}

export default function BanksAdminPage() {
  const [banks, setBanks] = useState<Bank[]>([])
  const [newBankName, setNewBankName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchBanks()
  }, [])

  const fetchBanks = async () => {
    const { data, error } = await supabase.from('banks').select('*')
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
        <h1 className="text-2xl font-bold mb-8">Bank Management</h1>

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

        <form onSubmit={addBank} className="mb-8 bg-white p-6 rounded shadow-sm">
          <div className="flex gap-4">
            <input
              type="text"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              placeholder="Bank name"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#e20074] text-white rounded hover:bg-[#cb0068]"
            >
              Add Bank
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {banks.map((bank) => (
            <div
              key={bank.id}
              className="flex items-center justify-between p-4 bg-white rounded shadow-sm"
            >
              <span className="font-medium">{bank.name}</span>
              <button
                onClick={() => toggleBankStatus(bank.id, bank.active)}
                className={`px-4 py-2 rounded text-white ${
                  bank.active 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {bank.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
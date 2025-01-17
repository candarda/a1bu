'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basit bir kimlik doğrulama - gerçek projede bu bilgiler environment variable'da olmalı
    if (username === 'admin' && password === 'admin123') {
      // Oturum bilgisini localStorage'da saklayalım
      localStorage.setItem('adminAuth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Ungültige Anmeldeinformationen')
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-full max-w-[400px] bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-[#e20074] text-sm bg-[#fff3f8] p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              required
              placeholder="Benutzername"
              className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="Passwort"
              className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#e20074] text-white py-3 text-[14px] font-medium hover:bg-[#cb0068]"
          >
            ANMELDEN
          </button>
        </form>
      </div>
    </div>
  )
} 
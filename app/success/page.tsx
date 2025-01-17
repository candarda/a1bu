'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-sm max-w-md w-full text-center">
        <div className="text-[#e20074] text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-4">Erfolgreich abgeschlossen!</h1>
        <p className="text-[#666] mb-4">
          Ihre Daten wurden erfolgreich übermittelt.
        </p>
        <p className="text-sm text-[#666]">
          Sie werden in Kürze weitergeleitet...
        </p>
      </div>
    </div>
  )
} 
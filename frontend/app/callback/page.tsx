'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CallbackPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')

    // ============================
    // ✅ SUCCESS CASE
    // ============================
    if (token) {
      localStorage.setItem('github_token', token)

      alert("✅ GitHub connected successfully!")

      // Redirect back to main UI
      window.location.href = '/'
      return
    }

    // ============================
    // ❌ ERROR CASE
    // ============================
    alert("❌ GitHub login failed or token missing")
    window.location.href = '/'

  }, [searchParams])

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <p className="text-lg">Connecting to GitHub...</p>
    </div>
  )
}
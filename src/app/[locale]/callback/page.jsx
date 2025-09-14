'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useExchangeCode } from '@/api/authApi/authApi'

export default function CallbackPage() {
  const router = useRouter()
  const { mutate: exchangeCode, isLoading } = useExchangeCode()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      exchangeCode(code, {
        onSuccess: () => router.push('/dashboard'),
        onError: () => router.push('/login'),
      })
    } else {
      router.push('/login')
    }
  }, [exchangeCode, router])

  return <div>Loading...</div>
}

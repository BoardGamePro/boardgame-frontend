'use client'

import { useLogin } from '@/api/authApi/authApi'
import { useEffect } from 'react'

export default function LoginPage() {
  const { mutate: login, isLoading } = useLogin()

  useEffect(() => {
    login()
  }, [login])

  return (
    <div>
      {isLoading ? 'Redirecting to authorization...' : 'Initiating login...'}
    </div>
  )
}

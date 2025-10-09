'use client'

import { authService } from '@/api/authApi/authApi'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    setAccessToken(token)
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    enabled: !!accessToken,
  })

  useEffect(() => {
    if (data) setUser(data)
  }, [data])

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

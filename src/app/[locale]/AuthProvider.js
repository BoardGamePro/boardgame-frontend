'use client'

import { authService } from '@/api/authApi/authApi'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    enabled: !!accessToken,
    retry: false,
  })

  useEffect(() => {
    const handleLogout = () => {
      setAccessToken(null)
      setUser(null)
    }

    const handleRefreshSuccess = () => {
      refetch()
    }

    window.addEventListener('auth-logout', handleLogout)
    window.addEventListener('auth-refresh-success', handleRefreshSuccess)

    return () => {
      window.removeEventListener('auth-logout', handleLogout)
      window.removeEventListener('auth-refresh-success', handleRefreshSuccess)
    }
  }, [refetch])

  useEffect(() => {
    if (data) setUser(data)
  }, [data])

  useEffect(() => {
    const stored = localStorage.getItem('accessToken')
    if (stored !== accessToken) setAccessToken(stored)
  }, [accessToken])

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

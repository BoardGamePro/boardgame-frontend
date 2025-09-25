'use client'

import React, { useEffect } from 'react'
import { useAuth } from '../AuthProvider'
import { useRouter } from '@/i18n/navigation'
import PageLayout from '@/components/layouts/PageLayout'

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/catalog')
    }
  }, [user])

  return (
    <PageLayout>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </>
      ) : (
        <p>Error</p>
      )}
    </PageLayout>
  )
}

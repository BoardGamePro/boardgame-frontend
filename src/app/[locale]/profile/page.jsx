'use client'

import React, { useEffect } from 'react'
import { useAuth } from '../AuthProvider'
import { useRouter } from '@/i18n/navigation'
import PageLayout from '@/components/layouts/PageLayout'
import { useLogout } from '@/api/authApi/authApi'

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { mutate: logout } = useLogout()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/catalog')
    }
  }, [user, isLoading, router])

  return (
    <PageLayout>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[24px] font-semibold">{user.username}</p>
          <p className="text-[20px]">{user.email}</p>
          <p className="text-[20px]">{user.id}</p>

          <button
            className="transition-custom rounded-xl bg-red-500 px-[15px] py-[5px] text-[20px] text-[white] hover:bg-red-400"
            onClick={() => logout()}
          >
            logout
          </button>
        </div>
      ) : (
        <p>Error</p>
      )}
    </PageLayout>
  )
}

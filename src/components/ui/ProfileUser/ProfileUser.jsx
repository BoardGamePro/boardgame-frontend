'use client'

import React from 'react'
import PageLayout from '@/components/layouts/PageLayout'
import { useGetUserById } from '@/api/authApi/authApi'

export default function ProfileUser({ id }) {
  const { data: user, isLoading, error } = useGetUserById(id)

  const isPrivateProfile = error && error.status === 403

  return (
    <PageLayout>
      {isLoading ? (
        <p>Loading...</p>
      ) : isPrivateProfile ? (
        <p>This user has a private profile</p>
      ) : !user ? (
        <p>User not found</p>
      ) : (
        <div className="flex w-full gap-[40px] rounded-[8px] border border-[#E5E5E5] bg-white px-[40px] py-[20px] shadow-[0_4px_8px_rgba(142,141,208,0.16)]">
          <div className="flex h-[240px] w-[240px] items-center justify-center rounded-full bg-(--color-light-neutral)">
            <p className="text-9xl">{user.username[0].toUpperCase()}</p>
          </div>

          <div>
            <h1 className="mb-[20px] text-[32px] font-semibold">
              {user.username}
            </h1>

            {user.bio && (
              <div className="!text-[16px]/[1.5]">
                <span className="mb-[5px] text-(--color-text-gray)">
                  About me
                </span>
                <p className="min-h-[100px] min-w-[600px] rounded-[8px] border border-[#C7C7C7] px-[12px] py-[6px] text-[#707070]">
                  {user.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  )
}

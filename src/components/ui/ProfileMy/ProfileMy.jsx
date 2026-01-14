'use client'

import React, { useState } from 'react'
import PageLayout from '@/components/layouts/PageLayout'
import { useLogout, useChangeProfile } from '@/api/authApi/authApi'
import { useRouter } from '@/i18n/navigation'
import { useAuth } from '@/app/[locale]/AuthProvider'
import { useTranslations } from 'next-intl'

export default function ProfileMy() {
  const { user, isLoading } = useAuth()
  const { mutate: logout } = useLogout()
  const { mutate: changeProfile } = useChangeProfile()
  const router = useRouter()
  const t = useTranslations('profile')

  const [isPublicProfile, setIsPublicProfile] = useState(
    user?.is_profile_public || false
  )

  const [isCollectionPublic, setIsCollectionPublic] = useState(
    user?.is_collection_public || false
  )

  return (
    <PageLayout>
      {isLoading || !user ? (
        <p>{t('loading')}</p>
      ) : (
        <div className="relative flex flex-col items-center gap-[10px]">
          <div className="flex w-full gap-[40px] rounded-[8px] border border-[#E5E5E5] bg-white px-[40px] py-[20px] shadow-[0_4px_8px_rgba(142,141,208,0.16)]">
            <div className="flex h-[240px] w-[240px] items-center justify-center rounded-full bg-(--color-light-neutral)">
              <p className="text-9xl">{user.username[0].toUpperCase()}</p>
            </div>

            <div>
              <h1 className="mb-[20px] text-[32px] font-semibold">
                {user.username}
              </h1>

              <div className="mb-[20px] flex !text-[16px]/[1.5]">
                <span className="mr-[20px] text-(--color-text-gray)">
                  {t('email')}
                </span>
                <p>{user.email}</p>
              </div>

              <div className="!text-[16px]/[1.5]">
                <span className="mb-[5px] text-(--color-text-gray)">
                  {t('aboutMe')}
                </span>
                <p className="min-h-[100px] min-w-[600px] rounded-[8px] border border-[#C7C7C7] px-[12px] py-[6px] text-[#707070]">
                  {user.bio || t('noBio')}
                </p>
              </div>
            </div>

            <button className="transition-custom absolute top-[20px] right-[40px] rounded-[4px] border border-[#E5E5E5] px-[12px] py-[8px] text-[12px] font-medium hover:opacity-75">
              {t('editProfile')}
            </button>
          </div>

          <div className="w-full rounded-[8px] border border-[#E5E5E5] bg-white px-[40px] py-[20px] shadow-[0_4px_8px_rgba(142,141,208,0.16)]">
            <h2 className="mb-[40px] text-[24px]">{t('privacySettings')}</h2>

            <div className="flex items-center justify-between border-b border-(--color-text-light-gray) pb-[20px]">
              <div>
                <h3 className="mb-[10px] text-[18px] font-semibold text-[#242424]">
                  {t('publicProfile')}
                </h3>
                <p className="!text-[16px]/[1.5] text-(--color-text-gray)">
                  {t('publicProfileDesc')}
                </p>
              </div>

              <label className="relative inline-block h-[20px] w-[40px] cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={isPublicProfile}
                  onChange={() =>
                    setIsPublicProfile((prev) => {
                      changeProfile({ isProfilePublic: !prev })
                      return !prev
                    })
                  }
                />
                <span className="transition-custom absolute inset-0 rounded-[10px] border peer-checked:border-(--color-accent) peer-checked:bg-(--color-accent)"></span>
                <span className="transition-custom absolute top-1/2 left-[3px] h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-(--color-text-default) peer-checked:left-[23px] peer-checked:bg-white"></span>
              </label>
            </div>

            <div className="flex items-center justify-between pt-[20px]">
              <div>
                <h3 className="mb-[10px] text-[18px] font-semibold text-[#242424]">
                  {t('publicCollection')}
                </h3>
                <p className="!text-[16px]/[1.5] text-(--color-text-gray)">
                  {t('publicCollectionDesc')}
                </p>
              </div>

              <label className="relative inline-block h-[20px] w-[40px] cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={isCollectionPublic}
                  onChange={() =>
                    setIsCollectionPublic((prev) => {
                      changeProfile({ isPublicCollection: !prev })
                      return !prev
                    })
                  }
                />
                <span className="transition-custom absolute inset-0 rounded-[10px] border peer-checked:border-(--color-accent) peer-checked:bg-(--color-accent)"></span>
                <span className="transition-custom absolute top-1/2 left-[3px] h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-(--color-text-default) peer-checked:left-[23px] peer-checked:bg-white"></span>
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              logout()
              router.push('/')
            }}
            className="transition-custom self-end rounded-[6px] border border-[#E5E5E5] bg-red-500 px-[15px] py-[8px] font-medium text-white hover:bg-red-400"
          >
            {t('logout')}
          </button>
        </div>
      )}
    </PageLayout>
  )
}

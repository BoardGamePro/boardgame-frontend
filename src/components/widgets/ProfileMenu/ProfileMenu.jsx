'use client'

import ProfileMenuLButton from '@/components/ui/ProfileMenuButton'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import AuthPopup from '../AuthPopup'
import { useAuth } from '@/app/[locale]/AuthProvider'
import { Link } from '@/i18n/navigation'

export default function ProfileMenu() {
  const [authPopusIsActive, setAuthPopupIsActive] = useState(false)
  const [authState, setAuthState] = useState('none')
  const t = useTranslations('header')

  const menuRef = useRef(null)

  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (authPopusIsActive) {
      document.body.classList.add('fixed', 'overflow-y-scroll')
    } else {
      document.body.classList.remove('fixed', 'overflow-y-scroll')
    }
  }, [authPopusIsActive])

  return isLoading ? (
    <p>Loading...</p>
  ) : user ? (
    <Link href="/profile" className="text-[14px] font-medium">
      {user.username}
    </Link>
  ) : (
    <>
      <div className={`flex gap-[44px]`} ref={menuRef}>
        <ProfileMenuLButton
          textContent={t('loginButton')}
          handleOpenAuthPopup={() => {
            setAuthPopupIsActive(true)
            setAuthState('login')
          }}
        />
        <ProfileMenuLButton
          textContent={t('signUpButton')}
          hasMainColor
          handleOpenAuthPopup={() => {
            setAuthPopupIsActive(true)
            setAuthState('register')
          }}
        />
      </div>

      {authPopusIsActive && (
        <AuthPopup
          authState={authState}
          changeAuthState={(value) => setAuthState(value)}
          handleClosePopup={() => setAuthPopupIsActive(false)}
        />
      )}
    </>
  )
}

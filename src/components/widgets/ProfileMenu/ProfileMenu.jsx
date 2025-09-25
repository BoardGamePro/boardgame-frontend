'use client'

import ProfileMenuLButton from '@/components/ui/ProfileMenuButton'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import AuthPopup from '../AuthPopup'
import { useAuth } from '@/app/[locale]/AuthProvider'
import { Link } from '@/i18n/navigation'

export default function ProfileMenu() {
  const [menuIsActive, setMenuIsActive] = useState(false)
  const [authPopusIsActive, setAuthPopupIsActive] = useState(false)
  const [authState, setAuthState] = useState('none')
  const t = useTranslations('header')

  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const { user, isLoading } = useAuth()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuIsActive(false)
      }
    }

    if (menuIsActive) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuIsActive])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuIsActive(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (menuIsActive || authPopusIsActive) {
      document.body.classList.add('fixed', 'overflow-y-scroll')
    } else {
      document.body.classList.remove('fixed', 'overflow-y-scroll')
    }
  }, [menuIsActive, authPopusIsActive])

  return isLoading ? (
    <p>Loading...</p>
  ) : user ? (
    <Link href="/profile">{user.username}</Link>
  ) : (
    <>
      <button
        className={`rounded-full w-[36px] h-[36px] flex items-center justify-center ${menuIsActive ? 'bg-[var(--color-main)]' : 'bg-white'} hover:scale-105 active:scale-95 transition-custom`}
        type="bytton"
        ref={buttonRef}
        onClick={() => setMenuIsActive((prev) => !prev)}
      >
        <svg
          width="22"
          height="24"
          viewBox="0 0 22 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.3334 22.5V20.1667C20.3334 18.929 19.8417 17.742 18.9666 16.8668C18.0914 15.9917 16.9044 15.5 15.6667 15.5H6.33342C5.09574 15.5 3.90875 15.9917 3.03358 16.8668C2.15841 17.742 1.66675 18.929 1.66675 20.1667V22.5M15.6667 6.16667C15.6667 8.744 13.5774 10.8333 11.0001 10.8333C8.42275 10.8333 6.33342 8.744 6.33342 6.16667C6.33342 3.58934 8.42275 1.5 11.0001 1.5C13.5774 1.5 15.6667 3.58934 15.6667 6.16667Z"
            stroke={`${menuIsActive ? 'white' : 'var(--color-main)'}`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {menuIsActive && (
        <div
          className={`flex flex-col py-[24px] px-[29px] gap-[24px] bg-[var(--color-gray)] rounded-[16px] absolute top-[62px] right-[10px] min-[1440px]:right-[calc((100%-1440px)/2+10px)]`}
          ref={menuRef}
        >
          <ProfileMenuLButton
            textContent={t('loginButton')}
            handleOpenAuthPopup={() => {
              setMenuIsActive(false)
              setAuthPopupIsActive(true)
              setAuthState('login')
            }}
          />
          <ProfileMenuLButton
            textContent={t('signUpButton')}
            hasMainColor
            handleOpenAuthPopup={() => {
              setMenuIsActive(false)
              setAuthPopupIsActive(true)
              setAuthState('register')
            }}
          />
        </div>
      )}

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

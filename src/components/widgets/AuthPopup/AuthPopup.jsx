import AuthLoginPopup from '@/components/ui/AuthLoginPopup'
import AuthRegisterPopup from '@/components/ui/AuthRegisterPopup'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

export default function AuthPopup({
  authState = 'login',
  changeAuthState,
  handleClosePopup,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClosePopup()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClosePopup])

  const handleOverlayClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      handleClosePopup()
    }
  }

  return (
    <div
      className="absolute top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.12)]"
      onClick={handleOverlayClick}
    >
      <div
        className="absolute top-[calc(100vh/2)] left-[calc(100vw/2)] min-h-[380px] w-[434px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-white px-[66px] py-[29px] text-black"
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-end justify-center gap-[7px] text-[26px] font-semibold text-(--color-main)">
          Join the DiceBook
        </div>
        <button
          type="button"
          onClick={handleClosePopup}
          className="transition-custom absolute top-[12px] right-[12px] hover:scale-105 active:scale-95"
        >
          <Image
            src="/icons/close-icon.svg"
            width={24}
            height={24}
            alt="close-icon"
          />
        </button>

        <div className="flex flex-col items-center">
          {authState === 'login' ? (
            <AuthLoginPopup
              changeAuthState={() => changeAuthState('register')}
              handleClosePopup={handleClosePopup}
            />
          ) : (
            <AuthRegisterPopup
              changeAuthState={() => changeAuthState('login')}
              handleClosePopup={handleClosePopup}
            />
          )}
        </div>
      </div>
    </div>
  )
}

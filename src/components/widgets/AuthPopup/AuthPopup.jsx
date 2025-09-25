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
      className="absolute bg-[rgba(0,0,0,0.12)] w-full h-full left-0 top-0 flex justify-center items-center z-100"
      onClick={handleOverlayClick}
    >
      <div
        className="w-[434px] min-h-[380px] py-[29px] px-[66px] rounded-[16px] bg-white absolute top-[calc(100vh/2)] left-[calc(100vw/2)] -translate-x-1/2 -translate-y-1/2"
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-end gap-[7px] justify-center">
          Join the
          <Image src="/icons/logo.svg" width={185} height={27} alt="logo" />
        </div>
        <button
          type="button"
          onClick={handleClosePopup}
          className="absolute right-[12px] top-[12px] hover:scale-105 active:scale-95 transition-custom"
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

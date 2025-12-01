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
      if (e.key === 'Escape') handleClosePopup()
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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[562px] rounded-[10px] bg-white px-[41px] py-[60px] shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      >
        <button
          type="button"
          onClick={handleClosePopup}
          className="absolute top-5 right-5"
        >
          <Image
            src="/icons/cross.svg"
            width={26}
            height={26}
            alt="close-icon"
          />
        </button>

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
  )
}

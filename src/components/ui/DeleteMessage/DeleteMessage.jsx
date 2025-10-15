'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function DeleteMessagePopup({ handleClose, handleDelete }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClose])

  const handleOverlayClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      handleClose()
    }
  }

  return (
    <div
      className="fixed top-0 left-0 z-[100] flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.12)]"
      onClick={handleOverlayClick}
    >
      <div
        className="absolute top-[calc(100vh/2)] left-[calc(100vw/2)] flex min-h-[150px] w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-[16px] bg-white px-[30px] py-[25px] text-black"
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-[12px] right-[12px] transition-transform hover:scale-105 active:scale-95"
        >
          <Image
            src="/icons/close-icon.svg"
            width={24}
            height={24}
            alt="close"
          />
        </button>

        <h2 className="mb-[20px] text-center text-[20px] font-semibold text-red-600">
          Do you want to delete this chat?
        </h2>

        <div className="flex justify-center gap-[15px]">
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-2xl bg-red-500 px-[20px] py-[10px] font-semibold text-white transition-colors hover:bg-red-600"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-2xl bg-(--background) px-[20px] py-[10px] text-black transition-colors hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

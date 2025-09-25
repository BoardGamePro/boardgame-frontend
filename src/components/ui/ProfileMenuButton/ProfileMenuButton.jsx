import React from 'react'

export default function ProfileMenuLButton({
  textContent,
  hasMainColor = false,
  handleOpenAuthPopup,
}) {
  return (
    <button
      onClick={handleOpenAuthPopup}
      className={`w-full min-w-[126px] px-[10px] py-[8.5px] font-medium text-[20px] rounded-[16px]  text-center ${hasMainColor ? 'bg-[var(--color-main)] text-white' : 'bg-white text-[var(--color-main)]'} hover:scale-105 active:scale-95 transition-custom`}
    >
      {textContent}
    </button>
  )
}

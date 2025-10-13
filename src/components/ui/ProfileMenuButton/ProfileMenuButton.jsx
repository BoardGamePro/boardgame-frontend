import React from 'react'

export default function ProfileMenuLButton({
  textContent,
  hasMainColor = false,
  handleOpenAuthPopup,
}) {
  return (
    <button
      onClick={handleOpenAuthPopup}
      className={`bg-none text-[14px] font-medium text-(--color-light-neutral)`}
    >
      {textContent}
    </button>
  )
}

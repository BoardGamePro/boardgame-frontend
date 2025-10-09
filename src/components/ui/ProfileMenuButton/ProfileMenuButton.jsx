import React from 'react'

export default function ProfileMenuLButton({
  textContent,
  hasMainColor = false,
  handleOpenAuthPopup,
}) {
  return (
    <button
      onClick={handleOpenAuthPopup}
      className={`bg-none font-medium text-14 text-[var(--color-light-neutral)]`}
    >
      {textContent}
    </button>
  )
}

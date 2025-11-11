import React from 'react'

export default function ProfileMenuLButton({
  textContent,
  handleOpenAuthPopup,
}) {
  return (
    <button
      onClick={handleOpenAuthPopup}
      className={`bg-none text-[14px] font-medium`}
    >
      {textContent}
    </button>
  )
}

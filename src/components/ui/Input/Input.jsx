'use client'

import React from 'react'

export default function Input({
  placeholder,
  type = 'text',
  value,
  setValue,
  required = true,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-[15px] border-[2px] border-(--color-gray) bg-white px-[15px] py-[5px] text-[15px] font-bold focus:outline-none"
      value={value}
      onChange={(evt) => setValue(evt.target.value)}
      required={required}
    />
  )
}

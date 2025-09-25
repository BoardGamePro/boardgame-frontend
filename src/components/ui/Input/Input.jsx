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
      className="bg-white border-[var(--color-gray)] border-[2px] rounded-[15px] w-full px-[15px] py-[5px] text-[15px] font-bold focus:outline-none"
      value={value}
      onChange={(evt) => setValue(evt.target.value)}
      required={required}
    />
  )
}

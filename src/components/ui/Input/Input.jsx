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
      className="bg-[#f6f6f6] rounded-xl mb-[10px] w-full px-[15px] py-[7px] text-lg focus:outline-none"
      value={value}
      onChange={(evt) => setValue(evt.target.value)}
      required={required}
    />
  )
}

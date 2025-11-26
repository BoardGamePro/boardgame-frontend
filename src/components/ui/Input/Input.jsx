'use client'

import React from 'react'
import Image from 'next/image'

export default function Input({
  placeholder,
  type = 'text',
  value,
  setValue,
  required = true,
  icon,
}) {
  return (
    <div className="relative w-full">
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={16}
          height={16}
          className="absolute top-1/2 left-[12px] -translate-y-1/2 opacity-70"
        />
      )}

      <input
        type={type}
        placeholder={placeholder}
        className={`h-[40px] w-full rounded-[8px] border-[1px] border-(--color-text-light-gray-border) bg-white py-[9px] text-[15px] font-normal focus:outline-none ${icon ? 'pl-[40px]' : 'px-[15px]'}`}
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        required={required}
      />
    </div>
  )
}

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
  roundedFull = false,
  iconSize = 16,
  opacityIcon = true,
}) {
  return (
    <div className="relative w-full">
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={iconSize}
          height={iconSize}
          className={`absolute top-1/2 left-[12px] -translate-y-1/2 ${opacityIcon ? 'opacity-70' : ''}`}
        />
      )}

      <input
        type={type}
        placeholder={placeholder}
        className={`h-[40px] w-full border-[1px] border-(--color-text-light-gray-border) bg-white py-[9px] text-[15px] font-normal focus:outline-none ${icon ? 'pl-[40px]' : 'px-[15px]'} ${roundedFull ? 'rounded-full' : 'rounded-[15px]'}`}
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        required={required}
      />
    </div>
  )
}

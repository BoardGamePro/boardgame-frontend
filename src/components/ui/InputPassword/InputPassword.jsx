import React, { useState } from 'react'
import Image from 'next/image'

export default function InputPassword({ placeholder, value, setValue }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  return (
    <div className="relative w-full">
      {/* Иконка замка */}
      <Image
        src="/icons/lock.svg"
        alt="lock-icon"
        width={16}
        height={16}
        className="absolute top-1/2 left-[12px] -translate-y-1/2 opacity-70"
      />

      {/* Input */}
      <input
        type={isPasswordHidden ? 'password' : 'text'}
        placeholder={placeholder}
        className="h-[40px] w-full rounded-[8px] border-[1px] border-(--color-text-light-gray-border) bg-white py-[5px] pr-[40px] pl-[40px] text-[15px] font-normal focus:outline-none"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        required
      />

      {/* Кнопка-глаз */}
      <button
        type="button"
        className="absolute top-1/2 right-[12px] -translate-y-1/2"
        onClick={() => setIsPasswordHidden((prev) => !prev)}
      >
        <Image
          src={isPasswordHidden ? '/icons/eye.svg' : '/icons/eye-crossed.svg'}
          width={16}
          height={18}
          alt="eye-icon"
          className="opacity-70"
        />
      </button>
    </div>
  )
}

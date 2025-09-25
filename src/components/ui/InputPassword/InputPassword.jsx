import React, { useState } from 'react'
import Input from '../Input'
import Image from 'next/image'

export default function InputPassword({ placeholder, value, setValue }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  return (
    <div className="relative">
      <Input
        type={isPasswordHidden ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        setValue={setValue}
      />
      <button
        type="button"
        className="absolute top-[8px] right-[10px]"
        onClick={() => setIsPasswordHidden((prev) => !prev)}
      >
        <Image
          src={
            isPasswordHidden ? '/icons/eye-off-icon.svg' : '/icons/eye-icon.svg'
          }
          width={20}
          height={20}
          alt="eye-icon"
        />
      </button>
    </div>
  )
}

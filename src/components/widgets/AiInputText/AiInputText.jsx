'use client'

import React, { useState } from 'react'

export default function AiInputText({ placeholder, handleSubmit, isPending }) {
  const [value, setValue] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    handleSubmit(value)
    setValue('')
  }

  return (
    <form
      className="flex w-[800px] items-center rounded-4xl bg-(--background) px-[10px] py-[10px]"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        className="w-full rounded-2xl px-[15px] text-[18px] focus:outline-none focus-visible:outline-2 focus-visible:outline-black"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="transition-custom flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-full bg-white hover:bg-black hover:text-white disabled:!cursor-default disabled:bg-gray-400 disabled:text-black"
        type="submit"
        disabled={isPending || !value.trim()}
      >
        {isPending ? (
          <p>...</p>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"></path>
          </svg>
        )}
      </button>
    </form>
  )
}

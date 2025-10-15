import React from 'react'

export default function UserMessage({ message }) {
  return (
    <p className="ml-auto inline-block max-w-[80%] rounded-2xl bg-(--background) p-[15px] text-[18px]">
      {message}
    </p>
  )
}

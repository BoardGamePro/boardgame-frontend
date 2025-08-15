import React from 'react'

export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <form className="w-[350px] mh-[370px] p-[25px] rounded-3xl bg-white">
        {children}
      </form>
    </div>
  )
}

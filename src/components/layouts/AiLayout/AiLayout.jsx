'use client'

import { useAuth } from '@/app/[locale]/AuthProvider'
import Header from '@/components/ui/Header'
import AiSidebar from '@/components/widgets/AiSidebar'
import React from 'react'

export default function AiLayout({ children }) {
  const { user, isLoading } = useAuth()
  return (
    <>
      <Header />
      <main className="relative flex min-h-0 flex-1 bg-white">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : !user?.id ? (
          <p className="text-center">You need to log in</p>
        ) : (
          <>
            <AiSidebar />
            <section className="mx-auto flex h-full w-full flex-col items-center py-[30px] text-center">
              {children}
            </section>
          </>
        )}
      </main>
    </>
  )
}

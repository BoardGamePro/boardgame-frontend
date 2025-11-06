import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import React from 'react'

export default function PageLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-(--color-light-neutral) px-[calc((100%-1200px)/2)] py-[30px]">
        {children}
      </main>
      <Footer />
    </>
  )
}

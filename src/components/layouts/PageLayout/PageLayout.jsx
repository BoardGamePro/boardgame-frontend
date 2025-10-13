import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import React from 'react'

export default function PageLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-[100vh] bg-white px-[calc((100%-1080px)/2)] py-[30px]">
        {children}
      </main>
      <Footer />
    </>
  )
}

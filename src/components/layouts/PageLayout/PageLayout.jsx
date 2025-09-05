import Footer from '@/components/widgets/Footer'
import Header from '@/components/widgets/Header'
import React from 'react'

export default function PageLayout({ children }) {
  return (
    <>
      <Header />
      <main className="bg-white min-h-[100vh] py-[30px] px-[calc((100%-1080px)/2)]">
        {children}
      </main>
      <Footer />
    </>
  )
}

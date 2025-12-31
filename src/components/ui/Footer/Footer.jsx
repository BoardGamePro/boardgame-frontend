import React from 'react'
import FooterNavCategory from './FooterNavCategory'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { getFooterNavCategories } from '@/consts/footerNavCategories'

export default function Footer() {
  const t = useTranslations('footer')
  const footerNavCategories = getFooterNavCategories(t)

  return (
    <footer className="bg-[#101828] px-[calc((100%-1200px)/2)] pt-[60px] pb-[50px] text-white">
      <div className="mb-[50px] flex gap-[276px]">
        <Link href="/" className="text-[32px] font-[600]">
          DiceBook
        </Link>
        <ul className="flex w-full justify-between">
          {footerNavCategories.map((category, index) => (
            <FooterNavCategory key={index} category={category} />
          ))}
        </ul>
      </div>
      <p className="text-center text-[12px] text-(--color-text-light-gray)">
        © 2025 DiceBook – Educational Project by ЛАБУБЫ.
      </p>
    </footer>
  )
}

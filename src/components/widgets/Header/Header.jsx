import LanguageMenu from '@/components/ui/LanguagesMenu'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function Header() {
  const t = useTranslations('header')

  return (
    <header className="flex py-[10px]">
      <div className="ml-auto mr-[25px] flex gap-[20px]">
        <Link
          href="/register"
          className="px-[15px] py-[5px] rounded-lg text-center border-2 border-[#86888A] font-medium hover:opacity-50 transition-custom"
        >
          {t('signUpButton')}
        </Link>
        <LanguageMenu />
      </div>
    </header>
  )
}

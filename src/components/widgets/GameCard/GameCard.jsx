import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import React from 'react'

export default function GameCard({ gameInfo }) {
  const { canonicalName, title, releaseYear, summaryOrDescription, img } =
    gameInfo
  const t = useTranslations('gameCard')

  return (
    <div className="w-[300px] h-[390px] flex flex-col">
      {img ? (
        <Image
          src={img}
          alt={canonicalName}
          className="w-[300px] h-[200px] object-cover mb-[5px]"
        />
      ) : (
        <div className="w-[300px] h-[200px]"></div>
      )}
      <h3 className="font-bold text-lg mb-[5px]">
        {title}, {releaseYear}
      </h3>
      <p className="line-clamp-4 text-[#86888A] text-[16px]">
        {summaryOrDescription}
      </p>
      <Link
        href={`/catalog/game/${canonicalName}`}
        className="mt-[auto] ml-[auto] px-[15px] py-[5px] rounded-lg text-center border-2 border-[#86888A] font-medium hover:opacity-50 transition-custom"
      >
        {t('linkButton')}
      </Link>
    </div>
  )
}

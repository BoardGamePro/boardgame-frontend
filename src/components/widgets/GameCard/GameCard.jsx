'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'

export default function GameCard({ gameInfo }) {
  const { id, canonicalName, title, releaseYear, summaryOrDescription } =
    gameInfo
  const t = useTranslations('gameCard')

  const [img, setImg] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GAMES_API_URL}/games/${id}/images/0`
      )
      const data = await res.json()

      setImg(data.content.original.url)
    }

    fetchData()
  }, [id])

  return (
    <div className="flex h-[390px] w-[300px] flex-col">
      {img ? (
        <Image
          src={img}
          alt={canonicalName}
          width={300}
          height={200}
          className="mb-[5px] h-[200px] w-[300px] object-cover"
        />
      ) : (
        <div className="h-[200px] w-[300px]"></div>
      )}
      <h3 className="mb-[5px] text-lg font-bold">
        {title}, {releaseYear}
      </h3>
      <p className="line-clamp-4 text-[16px] text-[#86888A]">
        {summaryOrDescription}
      </p>
      <Link
        href={`/catalog/game/${canonicalName}`}
        className="transition-custom mt-[auto] ml-[auto] rounded-lg border-2 border-[#86888A] px-[15px] py-[5px] text-center font-medium hover:opacity-50"
      >
        {t('linkButton')}
      </Link>
    </div>
  )
}

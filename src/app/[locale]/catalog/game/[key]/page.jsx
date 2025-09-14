'use client'

import { useGetGameByName } from '@/api/gamesApi/gamesApi'
import PageLayout from '@/components/layouts/PageLayout'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function GamePage({ params }) {
  const router = useRouter()
  const pathname = usePathname()

  const resolvedParams = React.use(params)
  const { key } = resolvedParams

  const { data: game, isLoading, isError } = useGetGameByName(key)
  const t = useTranslations('gamePage')

  const handleBack = () => {
    const newPath = pathname.replace(/\/[^/]+\/[^/]+$/, '')
    router.push(newPath)
  }

  return (
    <PageLayout>
      {isLoading ? (
        isError ? (
          !game ? (
            <h1>{t('gameNotFound')}</h1>
          ) : (
            <p className="mt-4 text-red-500">{t('gameLoadError')}</p>
          )
        ) : (
          <p className="mt-4">{t('gameLoad')}</p>
        )
      ) : (
        <>
          <div className="flex gap-[30px] items-center mb-[20px]">
            <button onClick={handleBack}>
              <Image
                src="/images/arrow-back.svg"
                width={24}
                height={24}
                alt="back"
              />
            </button>
            <h1 className="font-bold text-3xl">
              {game.title}, {game.releaseYear}
            </h1>
          </div>
          <div className="flex gap-[100px] mb-[40px]">
            <div>
              {game.img ? (
                <Image
                  src={game.img}
                  alt={game.canonicalName}
                  className="w-[300px] h-[300px] object-cover"
                />
              ) : (
                <div className="w-[300px] h-[300px]"></div>
              )}
            </div>

            <div>
              <h2 className="mb-[5px] font-semibold text-lg">
                {t('informationTitle')}
              </h2>
              <p>{game.minimumAge} +</p>
              <p>
                {t('playersCount', {
                  playerFrom: game.minimumPlayers,
                  playerTo: game.maximumPlayers,
                })}
              </p>
              {game.sources.map(({ site, siteKey, siteUrl, siteRating }) => (
                <div className="flex" key={siteKey}>
                  <p className="mr-[15px]">
                    {site} {t('rating')}:
                  </p>
                  <Link
                    href={siteUrl}
                    className="text-[#0070c0] underline decoration-[#0070c0] hover:no-underline"
                    target="_blank"
                  >
                    {siteRating}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <h2 className="mb-[5px] font-semibold text-lg">
            {t('gameDescription')}
          </h2>
          <p>{game.description}</p>
        </>
      )}
    </PageLayout>
  )
}

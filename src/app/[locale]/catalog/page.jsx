'use client'

import { useGetAllGames } from '@/api/gamesApi/gamesApi'
import PageLayout from '@/components/layouts/PageLayout'
import GameCard from '@/components/widgets/GameCard'
import React from 'react'
import { useTranslations } from 'use-intl'

export default function Catalog() {
  const { data: games, isLoading, isError } = useGetAllGames()
  const t = useTranslations('catalog')

  return (
    <PageLayout>
      <h1 className="font-bold text-2xl">{t('title')}</h1>
      {isLoading ? (
        isError ? (
          !games || games.length === 0 ? (
            <p className="mt-4">{t('gamesNotFound')}</p>
          ) : (
            <p className="mt-4 text-red-500">{t('gameLoadError')}</p>
          )
        ) : (
          <p className="mt-4">{t('gameLoad')}</p>
        )
      ) : (
        <div className="flex gap-[30px] mt-[30px] flex-wrap">
          {games.result.map((game) => (
            <GameCard key={game.canonicalName || game.id} gameInfo={game} />
          ))}
        </div>
      )}
    </PageLayout>
  )
}

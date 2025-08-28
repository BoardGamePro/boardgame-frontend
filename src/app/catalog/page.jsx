'use client'

import { useGetAllGames } from '@/api/gamesApi/gamesApi'
import PageLayout from '@/components/layouts/PageLayout'
import GameCard from '@/components/widgets/GameCard'
import React from 'react'

export default function Catalog() {
  const { data: games, isLoading, isError } = useGetAllGames()

  return (
    <PageLayout>
      <h1 className="font-bold text-2xl">Каталог игр</h1>
      {isLoading ? (
        isError ? (
          !games || games.length === 0 ? (
            <p className="mt-4">Игры не найдены.</p>
          ) : (
            <p className="mt-4 text-red-500">Ошибка при загрузке игр.</p>
          )
        ) : (
          <p className="mt-4">Загрузка игр...</p>
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

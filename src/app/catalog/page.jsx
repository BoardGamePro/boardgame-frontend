import PageLayout from '@/components/layouts/PageLayout'
import GameCard from '@/components/widgets/GameCard'
import React from 'react'
import { gameMocks } from '../mocks/dataGame'

export default function Catalog() {
  return (
    <PageLayout>
      <h1 className="font-bold text-2xl">Каталог игр</h1>

      <div className="flex gap-[30px] mt-[30px]">
        {gameMocks.map((game) => (
          <GameCard key={game.canonicalName} gameInfo={game} />
        ))}
      </div>
    </PageLayout>
  )
}

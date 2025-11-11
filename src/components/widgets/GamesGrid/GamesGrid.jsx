'use client'

import GridSwitcher from '@/components/ui/GridSwitcher'
import React, { useState } from 'react'
import GameCard from '../GameCard'
import { sortingTypes } from '@/consts/sortingTypes'

export default function GamesGrid({ games }) {
  const [viewMode, setViewMode] = useState('grid')
  const [sortState, setSortState] = useState({
    selectedSort: null,
    sortOrder: null,
  })

  const onSortClick = (value) => {
    setSortState((prev) => {
      if (prev.selectedSort === value) {
        return {
          selectedSort: value,
          sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
        }
      } else {
        return { selectedSort: value, sortOrder: 'asc' }
      }
    })
  }

  return (
    <div
      className={`grid gap-[30px] ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}
    >
      <div className="col-span-full flex items-center">
        <div className="flex gap-[20px] text-[12px] text-(--color-text-gray)">
          {sortingTypes.map(({ text, value }) => {
            const isActive = sortState.selectedSort === value

            return (
              <button
                key={value}
                onClick={() => onSortClick(value)}
                className={`relative cursor-pointer select-none ${isActive ? 'pr-[19px] after:absolute after:top-1/2 after:right-0 after:h-[8px] after:w-[12px] after:-translate-y-1/2 after:bg-[url("/icons/rate.svg")] after:bg-contain after:bg-no-repeat after:content-[""]' : ''} ${isActive && sortState.sortOrder === 'desc' ? 'after:scale-x-[-1] after:rotate-180' : ''}`}
              >
                {text}
              </button>
            )
          })}
        </div>
        <GridSwitcher viewMode={viewMode} onChange={setViewMode} />
      </div>
      {games.result.map((game) => (
        <GameCard
          key={game.canonicalName || game.id}
          gameInfo={game}
          viewMode={viewMode}
        />
      ))}
    </div>
  )
}

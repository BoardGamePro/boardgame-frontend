'use client'

import GridSwitcher from '@/components/ui/GridSwitcher'
import React, { useEffect, useState } from 'react'
import GameCard from '../GameCard'
import { sortingTypes } from '@/consts/sortingTypes'
import CatalogPageSwitcher from '@/components/ui/CatalogPageSwitcher/CatalogPageSwitcher'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'

export default function GamesGrid({ games, sortBy }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [viewMode, setViewMode] = useState('grid')
  const [sortState, setSortState] = useState({
    selectedSort: null,
    sortOrder: null,
  })

  const pages = Math.ceil(games.total / 9)

  const onSortClick = (value) => {
    const newSortState =
      sortState.selectedSort === value
        ? {
            selectedSort: value,
            sortOrder: sortState.sortOrder === 'asc' ? 'desc' : 'asc',
          }
        : { selectedSort: value, sortOrder: 'asc' }

    setSortState(newSortState)

    const params = new URLSearchParams(searchParams.toString())
    params.set(
      'sortBy',
      `${newSortState.selectedSort}-${newSortState.sortOrder}`
    )
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    if (sortBy) {
      const [selectedSort, sortOrder] = sortBy.split('-')
      setSortState({ selectedSort, sortOrder })
    } else {
      setSortState({ selectedSort: null, sortOrder: null })
    }
  }, [sortBy])

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
      <CatalogPageSwitcher pages={pages} />
    </div>
  )
}

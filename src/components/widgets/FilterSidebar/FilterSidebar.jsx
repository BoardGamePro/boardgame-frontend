'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import PlayersCategory from './PlayersCategory'
import AgeCategory from './AgeCategory'
import YearCategory from './YearCategory'
import RateCategory from './RateCategory'
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { filterTypes } from '@/consts/filterTypes'

export default function FilterSidebar() {
  const t = useTranslations('filters')
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    players: searchParams.get('players') || '',
    age: searchParams.get('age') || '',
    minYear: searchParams.get('minYear') || filterTypes.year.min,
    maxYear: searchParams.get('maxYear') || filterTypes.year.max,
    rate: searchParams.get('rate') || 0,
  })

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = (evt) => {
    evt.preventDefault()
    const params = new URLSearchParams()

    params.set('page', 1)
    params.delete('sortBy')
    if (filters.players) params.set('players', filters.players)
    if (filters.age) params.set('age', filters.age)
    if (filters.minYear) params.set('minYear', filters.minYear)
    if (filters.maxYear) params.set('maxYear', filters.maxYear)
    if (filters.rate) params.set('rate', filters.rate)

    router.push(`?${params.toString()}`)
  }

  const resetFilters = () => {
    setFilters({
      players: '',
      age: '',
      minYear: filterTypes.year.min,
      maxYear: filterTypes.year.max,
      rate: 0,
    })
    router.push('/catalog')
  }

  return (
    <aside className="h-fit w-full rounded-[10px] border border-[#E5E5E5] bg-white py-[30px] shadow-[0px_4px_4px_0px_rgba(142,141,208,0.16)]">
      <form className="flex flex-col gap-[32px]" onSubmit={applyFilters}>
        <div className="flex justify-between px-[20px]">
          <h2 className="bg-[image:url('/icons/filter.svg')] bg-position-[left_center] bg-no-repeat pl-[30px] text-[24px] font-semibold">
            {t('title')}
          </h2>
          <button
            type="reset"
            className="transition-custom rounded-[4px] border border-[#E5E5E5] p-[4.5px_12px] text-[12px] font-medium hover:opacity-80"
            onClick={resetFilters}
          >
            {t('reset')}
          </button>
        </div>

        <PlayersCategory
          t={t}
          value={filters.players}
          onChange={(val) => updateFilter('players', val)}
        />
        <AgeCategory
          t={t}
          value={filters.age}
          onChange={(val) => updateFilter('age', val)}
        />
        <YearCategory
          t={t}
          value={{ minYear: filters.minYear, maxYear: filters.maxYear }}
          onChange={(val) =>
            updateFilter('minYear', val.minYear) ||
            updateFilter('maxYear', val.maxYear)
          }
        />
        <RateCategory
          t={t}
          value={filters.rate}
          onChange={(val) => updateFilter('rate', val)}
        />

        <button className="transition-custom mx-[20px] mt-auto rounded-[4px] bg-(--color-accent) py-[9.5px] text-center text-[14px] font-medium text-white hover:opacity-90">
          {t('apply')}
        </button>
      </form>
    </aside>
  )
}

'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { getFilterTypes } from '@/consts/filterTypes'

export default function RateCategory({ value, onChange }) {
  const t = useTranslations()
  const filterTypes = getFilterTypes(t)

  return (
    <div className="px-[20px]">
      <h3 className="mb-[10px] bg-[image:url('/icons/star-filter.svg')] bg-position-[left_center] bg-no-repeat pl-[26px] text-[18px] font-semibold">
        {filterTypes.rate.name}
      </h3>
      <fieldset className="flex items-center gap-[10px]">
        <input
          type="number"
          name="min-rate"
          value={value}
          min={filterTypes.rate.min}
          max={filterTypes.rate.max}
          onChange={(evt) => {
            const checkedValue =
              evt.target.value >= filterTypes.rate.min &&
              evt.target.value <= filterTypes.rate.max
                ? evt.target.value
                : value

            const val = checkedValue
            onChange(val)
          }}
          className="w-[80px] rounded-[100px] border border-[#C7C7C7] p-[6px_10px]"
        />
      </fieldset>
    </div>
  )
}

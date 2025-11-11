'use client'

import { filterTypes } from '@/consts/filterTypes'
import React, { useState } from 'react'

export default function YearCategory() {
  const [yearsRange, setYearsRange] = useState({
    minYear: filterTypes.year.min,
    maxYear: filterTypes.year.max,
  })

  return (
    <div className="border-b border-[#C7C7C7] px-[20px]">
      <h3 className="mb-[10px] bg-[image:url('/icons/calendar.svg')] bg-position-[left_center] bg-no-repeat pl-[26px] text-[18px] font-semibold">
        {filterTypes.year.name}
      </h3>
      <fieldset className="mb-[20px] flex items-center gap-[10px]">
        <input
          type="number"
          name="min-year"
          value={yearsRange.minYear}
          min={filterTypes.year.min}
          max={yearsRange.maxYear}
          onChange={(evt) =>
            setYearsRange((prev) => ({
              ...prev,
              minYear:
                evt.target.value >= 0 && evt.target.value.length <= 4
                  ? evt.target.value
                  : prev.minYear,
            }))
          }
          className="w-[80px] rounded-[100px] border border-[#C7C7C7] p-[6px_10px]"
        />
        <span className="h-[1px] w-[10px] rounded-[1px] bg-[#C7C7C7]"></span>
        <input
          type="number"
          name="max-year"
          value={yearsRange.maxYear}
          min={yearsRange.minYear}
          max={filterTypes.year.max}
          onChange={(evt) =>
            setYearsRange((prev) => ({
              ...prev,
              maxYear:
                evt.target.value >= 0 && evt.target.value.length <= 4
                  ? evt.target.value
                  : prev.maxYear,
            }))
          }
          className="w-[80px] rounded-[100px] border border-[#C7C7C7] p-[6px_10px]"
        />
      </fieldset>
    </div>
  )
}

'use client'

import { useFilterTypes } from '@/consts/filterTypes'

export default function YearCategory({ value, onChange }) {
  const filterTypes = useFilterTypes()
  const { minYear, maxYear } = value

  return (
    <div className="border-b border-[#C7C7C7] px-[20px]">
      <h3 className="mb-[10px] bg-[image:url('/icons/calendar.svg')] bg-position-[left_center] bg-no-repeat pl-[26px] text-[18px] font-semibold">
        {filterTypes.year.name}
      </h3>
      <fieldset className="mb-[20px] flex items-center gap-[10px]">
        <input
          type="number"
          name="min-year"
          value={minYear}
          min={filterTypes.year.min}
          max={maxYear}
          onChange={(evt) => {
            const val =
              evt.target.value >= 0 && evt.target.value.length <= 4
                ? evt.target.value
                : minYear

            onChange({ minYear: val, maxYear: maxYear })
          }}
          className="w-[80px] rounded-[100px] border border-[#C7C7C7] p-[6px_10px]"
        />
        <span className="h-[1px] w-[10px] rounded-[1px] bg-[#C7C7C7]"></span>
        <input
          type="number"
          name="max-year"
          value={maxYear}
          min={minYear}
          max={filterTypes.year.max}
          onChange={(evt) => {
            const val =
              evt.target.value >= 0 && evt.target.value.length <= 4
                ? evt.target.value
                : maxYear

            onChange({ minYear: minYear, maxYear: val })
          }}
          className="w-[80px] rounded-[100px] border border-[#C7C7C7] p-[6px_10px]"
        />
      </fieldset>
    </div>
  )
}

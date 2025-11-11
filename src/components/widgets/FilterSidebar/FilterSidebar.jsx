import React from 'react'
import PlayersCategory from './PlayersCategory'
import AgeCategory from './AgeCategory'
import YearCategory from './YearCategory'
import RateCategory from './RateCategory'

export default function FilterSidebar() {
  return (
    <aside className="h-fit w-full rounded-[10px] border border-[#E5E5E5] bg-white py-[30px] shadow-[0px_4px_4px_0px_rgba(142,141,208,0.16)]">
      <form className="flex flex-col gap-[32px]">
        <div className="flex justify-between px-[20px]">
          <h2 className="bg-[image:url('/icons/filter.svg')] bg-position-[left_center] bg-no-repeat pl-[30px] text-[24px] font-semibold">
            Filters
          </h2>
          <button
            type="reset"
            className="transition-custom rounded-[4px] border border-[#E5E5E5] p-[4.5px_12px] text-[12px] font-medium hover:opacity-80"
          >
            Reset
          </button>
        </div>
        <PlayersCategory />
        <AgeCategory />
        <YearCategory />
        <RateCategory />
        <button className="transition-custom mx-[20px] mt-auto rounded-[4px] bg-(--color-accent) py-[9.5px] text-center text-[14px] font-medium text-white hover:opacity-90">
          Apply
        </button>
      </form>
    </aside>
  )
}

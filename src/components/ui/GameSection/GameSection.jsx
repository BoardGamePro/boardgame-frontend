import React from 'react'

export default function GameSection({ title, children, sectionId }) {
  return (
    <section className="mb-[25px]" id={sectionId}>
      <div className="mb-[20px] w-full border-b border-[#5368BF]">
        <h2 className="mb-[10px] text-[24px] font-semibold text-black">
          {title}
        </h2>
      </div>

      {children}
    </section>
  )
}

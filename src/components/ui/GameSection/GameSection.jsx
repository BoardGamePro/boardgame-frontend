import React from 'react'

export default function GameSection({ title, children, sectionId }) {
  return (
    <section className="mb-[25px]" id={sectionId}>
      <div className="w-full border-b border-[#115EA3] mb-[10px]">
        <h2 className="text-black text-[24px] font-semibold mb-[10px]">
          {title}
        </h2>
      </div>

      {children}
    </section>
  )
}

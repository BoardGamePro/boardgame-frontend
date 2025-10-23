import Image from 'next/image'
import React from 'react'
import { Link } from '@/i18n/navigation'

export default function SourceCard({ sourceInfo }) {
  const { site, siteUrl, siteRating } = sourceInfo
  const sites = {
    bgg: {
      name: 'Board Game Geek',
      shortName: 'BGG',
      description: "The world's largest board game database",
    },
    tesera: {
      name: 'Tesera.ru',
      shortName: 'Tesera',
      description: 'Russian board game community and database',
    },
  }
  return (
    <div className="w-full rounded-[8px] border border-[#E5E5E5] bg-white p-[20px] shadow-[0px_4px_8px_rgba(142,141,208,0.16)]">
      <div className="mb-[20px] flex items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <Image src={`/${site}.png`} alt={site} width={40} height={40} />
          <div>
            <h3 className="mb-[5px] text-[18px] font-semibold text-[#242424]">
              {sites[site].name}
            </h3>
            <p className="text-[12px] text-(--color-text-gray)">
              {sites[site].description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0.5C11.1937 0.5 11.3697 0.61193 11.4521 0.787109L14.4287 7.12793L21.0762 8.15039C21.2613 8.17892 21.4153 8.30869 21.4746 8.48633C21.5338 8.66396 21.4882 8.86015 21.3574 8.99414L16.5332 13.9336L17.6738 20.9199C17.7045 21.1088 17.6242 21.299 17.4678 21.4092C17.3114 21.5192 17.1059 21.5299 16.9385 21.4375L11 18.1543L5.06152 21.4375C4.89412 21.5299 4.68864 21.5192 4.53223 21.4092C4.3758 21.299 4.29555 21.1088 4.32617 20.9199L5.46582 13.9336L0.642578 8.99414C0.511756 8.86015 0.46616 8.66396 0.525391 8.48633C0.584735 8.30869 0.73874 8.17892 0.923828 8.15039L7.57031 7.12793L10.5479 0.787109L10.583 0.724609C10.6746 0.585808 10.8305 0.5 11 0.5Z"
              fill="#FF9F00"
              stroke="#FF9F00"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[16px] text-(--color-text-default)">
            {siteRating}
            <span className="text-[12px] text-(--color-text-gray)">/10</span>
          </p>
        </div>
      </div>
      <Link
        href={siteUrl}
        className="!flex w-full items-center justify-center rounded-[4px] border border-[#E5E5E5] text-[14px] font-medium text-(--color-text-default)"
      >
        <p className="bg-[url(/icons/link.svg)] bg-[left_center] bg-no-repeat py-[9px] pl-[40px]">
          Open on {sites[site].shortName}
        </p>
      </Link>
    </div>
  )
}

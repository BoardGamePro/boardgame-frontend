'use client'

import { Link, usePathname } from '@/i18n/navigation'
import Image from 'next/image'

import React from 'react'

export default function FileCard({ fileData }) {
  const pathname = usePathname()
  return (
    <div className="w-1/2 rounded-[8px] border border-[#E5E5E5] bg-white p-[20px] shadow-[0px_4px_8px_rgba(142,141,208,0.16)]">
      <div className="mb-[20px] flex items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <Image
            src={`/${fileData.format}.png`}
            alt={fileData.format}
            width={40}
            height={40}
          />
          <div>
            <h3 className="mb-[5px] text-[18px] font-semibold text-[#242424]">
              {fileData.name}
            </h3>
            <p className="text-[12px] text-(--color-text-gray)">
              {fileData.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-[40px]">
        {fileData.format === 'pdf' && (
          <Link
            href={`${pathname}/files/${fileData.id}`}
            className="!flex w-[255px] items-center justify-center rounded-[4px] border border-[#E5E5E5] py-[7.5px] text-[14px] font-medium text-(--color-text-default)"
          >
            <p className="flex items-center bg-[url(/icons/view-icon.svg)] bg-[left_center] bg-no-repeat pl-[40px] !text-[14px]/[20px]">
              View
            </p>
          </Link>
        )}
        <a
          href={`/rules/${fileData.name}`}
          download={fileData.name}
          className="!flex w-[255px] items-center justify-center rounded-[4px] border border-[#E5E5E5] px-[74px] py-[7.5px] text-[14px] font-medium text-(--color-text-default)"
        >
          <p className="flex items-center bg-[url(/icons/download-icon.svg)] bg-[left_center] bg-no-repeat pl-[40px] !text-[14px]/[20px]">
            Download
          </p>
        </a>
      </div>
    </div>
  )
}

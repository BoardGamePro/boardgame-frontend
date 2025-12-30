'use client'

import { Link } from '@/i18n/navigation'
import { formatDate } from '@/utils/formatDate'

export default function Note({ noteData, isOpen, onToggle }) {
  return isOpen ? (
    <div className="rounded-[8px] border border-[#E5E5E5] bg-white px-[12px] py-[10px]">
      <h3 className="mb-[8px] text-[14px]/[16px] font-medium">
        {noteData.title || 'Untitled'}
      </h3>
      <p className="mb-[8px] text-[12px]">{noteData.comment_text}</p>
      <div className="flex text-[10px]/[16px] text-[#808080]">
        <Link href={`/user/${noteData.user_id}`} className="mr-[8px] underline">
          @{noteData.username}
        </Link>
        <p>{formatDate(noteData.created_at)}</p>
      </div>
    </div>
  ) : (
    <div className="flex justify-between rounded-[8px] border border-[#E5E5E5] bg-white px-[12px] py-[10px]">
      <div>
        <h3 className="mb-[8px] text-[14px]/[16px] font-medium">
          {noteData.title || 'Untitled'}
        </h3>
        <div className="flex text-[10px]/[16px] text-[#BFBFBF]">
          <p className="mr-[8px]">{noteData.username}</p>
          <p>{formatDate(noteData.created_at)}</p>
        </div>
      </div>
      <button onClick={onToggle}>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 13.2353L18 22.7647L9 13.2353"
            stroke="#212121"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

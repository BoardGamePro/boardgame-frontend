import { useGetChats } from '@/api/aiApi/aiApi'
import ChatsList from '@/components/ui/ChatsList'
import { Link } from '@/i18n/navigation'
import React from 'react'

export default function AiSidebar() {
  const { data: chats, isLoading, error } = useGetChats()

  return (
    <div className="relative h-full w-[250px] border-r border-(--background) bg-transparent px-[10px] py-[30px] shadow-md">
      <Link
        href="/ai"
        className="transition-custom !flex w-full items-center justify-between rounded-lg px-[10px] py-[7px] text-start font-bold hover:bg-(--background)"
      >
        New chat
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M19 12H5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </Link>

      <section className="mt-[40px]">
        <h3 className="mb-[15px] px-[7px] font-bold">Chats</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ChatsList chats={chats?.chats} />
        )}
      </section>
    </div>
  )
}

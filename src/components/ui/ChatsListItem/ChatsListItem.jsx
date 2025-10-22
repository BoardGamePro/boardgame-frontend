'use client'

import { Link, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import DeleteMessage from '../DeleteMessage'
import { useDeleteChat } from '@/api/aiApi/aiApi'

export default function ChatsListItem({ chatInfo }) {
  const [isPopupHidden, setIsPopupHidden] = useState(true)
  const params = useParams()
  const { mutateAsync: deleteChat, isPending } = useDeleteChat()
  const router = useRouter()

  const handleDelete = async (e) => {
    e.preventDefault()

    try {
      await deleteChat({ chatId: chatInfo.id })
      if (params?.id === chatInfo?.id) {
        router.push('/ai')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Link
        href={`/ai/${chatInfo.id}`}
        className={`group transition-custom relative rounded-lg px-[10px] py-[7px] hover:bg-(--background) ${params?.id === chatInfo.id && 'bg-(--background)'}`}
      >
        {chatInfo.title}

        <button
          className="transition-custom absolute top-[7px] right-[10px] opacity-0 group-hover:opacity-100 enabled:hover:scale-110 disabled:text-black"
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setIsPopupHidden(false)
          }}
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6.60001H21M4.8 6.60001H19.2V15C19.2 17.8284 19.2 19.2426 18.3213 20.1213C17.4426 21 16.0284 21 13.2 21H10.8C7.97157 21 6.55736 21 5.67868 20.1213C4.8 19.2426 4.8 17.8284 4.8 15V6.60001Z"
              stroke="#e60000"
              strokeWidth="null"
              strokeLinecap="round"
            ></path>
            <path
              d="M7.49994 6.59994V4.99994C7.49994 3.89537 8.39537 2.99994 9.49994 2.99994H14.4999C15.6045 2.99994 16.4999 3.89537 16.4999 4.99994V6.59994M16.4999 6.59994H2.99994M16.4999 6.59994H21"
              stroke="#e60000"
              strokeWidth="null"
              strokeLinecap="round"
            ></path>
            <path
              d="M10.2 11.1L10.2 16.5"
              stroke="#e60000"
              strokeWidth="null"
              strokeLinecap="round"
            ></path>
            <path
              d="M13.8 11.1L13.8 16.5"
              stroke="#e60000"
              strokeWidth="null"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      </Link>
      {!isPopupHidden && (
        <DeleteMessage
          handleDelete={handleDelete}
          handleClose={() => setIsPopupHidden(true)}
        />
      )}
    </>
  )
}

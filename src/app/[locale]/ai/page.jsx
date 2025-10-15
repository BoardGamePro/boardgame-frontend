'use client'

import React from 'react'
import AiLayout from '@/components/layouts/AiLayout'
import AiInputText from '@/components/widgets/AiInputText'
import { useCreateChat } from '@/api/aiApi/aiApi'
import { useRouter } from '@/i18n/navigation'

export default function AiPage() {
  const { mutateAsync: createChat, isPending, error } = useCreateChat()
  const router = useRouter()

  const handleSubmit = async (title) => {
    try {
      const res = await createChat({ title })
      router.push(`/ai/${res.id}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AiLayout>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="mb-[40px] text-[32px] font-bold">Create a new chat</h1>
        <AiInputText
          placeholder="Enter a title for the chat"
          isPending={isPending}
          handleSubmit={handleSubmit}
        />
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </AiLayout>
  )
}
